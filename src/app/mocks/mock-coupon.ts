import { CouponType } from "../types/coupon";

export const coupons: CouponType[] = [
    { id: 1, code: "DISC50", type: 1, value: 50 },
    { id: 2, code: "FLAT10", type: 2, value: 10 },
    { id: 3, code: "MIN300", type: 3, value: 40, minPrice: 300 },
    { id: 4, code: "CLOTHES15", type: 4, value: 15, productType: "Clothing" },
    { id: 5, code: "MYPOINT", type: 5, value: 0 },

    //set 2 
    { id: 6, code: "DISC60", type: 1, value: 60 },
    { id: 7, code: "FLAT20", type: 2, value: 20 },
    { id: 8, code: "DISC70", type: 1, value: 70 },
  ];