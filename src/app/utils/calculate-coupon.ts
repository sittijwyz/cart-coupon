import { CouponType } from "../types/coupon";
import { ItemType } from "../types/item";
import { UserType } from "../types/user";

const discountByPercent = (percent: number, totalPrice: number): number => {
  return (totalPrice * percent) / 100;
};

const discountByFixed = (discount: number): number => discount;

const discountByMinimum = (
  minimum: number,
  discount: number,
  totalPrice: number
): number => {
  const amount = Math.floor(totalPrice / minimum);
  return amount * discount;
};

const discountByCategory = (item: ItemType, coupon: CouponType): number => {
  return (item.price * coupon.value) / 100;
};

const discountByPoint = (user: UserType, totalPrice: number): number => {
  const point = user.point;
  const maximumDisc = totalPrice * 0.2;
  return point <= maximumDisc ? point : maximumDisc;
};

export const calculateDiscount = (
  coupons: CouponType[],
  items: ItemType[],
  user: UserType,
  totalPrice: number
): { totalDiscount: number; couponDiscounts: any } => {
  let discount = 0;
  let priceAfterDisc = totalPrice;
  let couponDiscounts: any = [];

  coupons.forEach((coupon) => {
    switch (coupon.type) {
      case 1: // Fixed
        discount = discountByFixed(coupon.value);
        priceAfterDisc -= discount;
        couponDiscounts.push({
          couponCode: coupon.code,
          couponDiscount: discount,
        });
        break;
      case 2: // Percentage
        discount = discountByPercent(coupon.value, priceAfterDisc);
        priceAfterDisc -= discount;
        couponDiscounts.push({
          couponCode: coupon.code,
          couponDiscount: discount,
        });
        break;
      case 3: // Minimum
        if (priceAfterDisc > coupon.value) {
          discount = discountByMinimum(
            coupon.minPrice ?? 0,
            coupon.value,
            priceAfterDisc
          );
        }
        couponDiscounts.push({
          couponCode: coupon.code,
          couponDiscount: discount,
        });
        break;
      case 4: // ProductType
        items.forEach((item) => {
          if (item.category === coupon.productType) {
            discount += discountByCategory(item, coupon);
          }
        });
        couponDiscounts.push({
          couponCode: coupon.code,
          couponDiscount: discount,
        });
        break;
      case 5: // Point
        discount = discountByPoint(user, priceAfterDisc);
        couponDiscounts.push({
          couponCode: coupon.code,
          couponDiscount: discount,
        });
        break;
      default:
        break;
    }
  });

  return { totalDiscount: discount, couponDiscounts };
};
