export interface CouponType {
    id: number;
    code: string;
    type: number;
    value: number;
    productType?: string;
    minPrice?:number
  }
  
export interface CouponStateType {
    appliedCoupons : CouponType[]
    discount :number
  }