import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

// data
import { coupons } from "@/app/mocks/mock-coupon";

// Type
import { CouponStateType } from "@/app/types/coupon";

const initialState: CouponStateType = {
  appliedCoupons: [],
  discount: 0,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<string>) => {
      const coupon = coupons.find((coupon) => coupon.code === action.payload);
      if (coupon) {
        // ถ้ายังไม่มีคูปองถูกใช้งาน หรือประเภทของคูปองนี้ตรงกับประเภทของคูปองที่ถูกใช้งานอยู่แล้ว
        if (
          state.appliedCoupons.length === 0 ||
          state.appliedCoupons.every((c) => c.type === coupon.type)
        ) {
          // ตรวจสอบซ้ำว่าคูปองนี้ยังไม่ถูกใช้งาน
          if (!state.appliedCoupons.find((c) => c.code === coupon.code)) {
            state.appliedCoupons.push(coupon);
          } else {
            alert("คูปองถูกใช้งานแล้ว");
          }
        } else {
          alert("คูปองคนละประเภท");
        }
      } else {
        alert("ไม่พบคูปองในระบบ");
      }
    },
    removeCoupon: (state, action: PayloadAction<string>) => {
      state.discount = 0; //reset ค่าใหม่ เพราะยังไง useCallback จะทำงานอยู่ดีใน shopping cart เนื่องจาก appliedCoupons เปลี่ยนแปลง
      state.appliedCoupons = state.appliedCoupons.filter(
        (c) => c.code !== action.payload
      );
    },
    incrementDiscount: (state, action: PayloadAction<number>) => {
      state.discount += action.payload;
    },
    decrementDiscount: (state, action: PayloadAction<number>) => {
      state.discount -= action.payload;
    },
  },
});

export const {
  applyCoupon,
  removeCoupon,
  incrementDiscount,
  decrementDiscount,
} = couponSlice.actions;
export const selectCouponState = (state: RootState) => state.coupon;
export default couponSlice.reducer;
