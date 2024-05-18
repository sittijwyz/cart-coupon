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
): number => {
  let discount = 0;
  let priceAfterDisc = totalPrice;

  coupons.forEach((coupon) => {
    switch (coupon.type) {
      case 1: // Fixed
        discount = discountByFixed(coupon.value);
        priceAfterDisc -= discount;
        break;
      case 2: // Percentage
        discount = discountByPercent(coupon.value, priceAfterDisc);
        priceAfterDisc -= discount;
        break;
      case 3: // Minimum
        if (priceAfterDisc > coupon.value) {
          discount = discountByMinimum(
            coupon.minPrice ?? 0,
            coupon.value,
            priceAfterDisc
          );
        }
        break;
      case 4: // ProductType
        items.forEach((item) => {
          if (item.category === coupon.productType) {
            discount += discountByCategory(item, coupon);
          }
        });
        break;
      case 5: // Point
        discount = discountByPoint(user, priceAfterDisc);
        break;
      default:
        break;
    }
  });

  return discount;
};
