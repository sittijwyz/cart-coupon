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
      if (coupon && !state.appliedCoupons.find((c) => c.code === coupon.code)) {
        state.appliedCoupons.push(coupon);
      } else {
        // แสดงข้อความแจ้งเตือนว่ารหัสคูปองไม่ถูกต้อง หรือถูกใช้งานแล้ว
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
