import {
  DefaultValue,
  selector,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  itemsState,
} from './atoms';
import { CartItems } from '../types/Item';
import { updateLocalStorage } from '../utils/UpdateLocalStorage';
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
} from '../constants/ShoppingCart';
/**
 * 전체 금액, 배송비 계산, 총 결제 금액 계산
 */

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const totalAmount = productIds.reduce(
      (prevTotalAmount, { id, product }) => {
        const { quantity, isChecked } = get(itemDetailsState(id));

        return isChecked
          ? prevTotalAmount + product.price * quantity
          : prevTotalAmount;
      },
      0,
    );
    const deliveryFee =
      totalAmount >= FREE_DELIVERY_THRESHOLD || totalAmount === 0
        ? 0
        : DELIVERY_FEE;
    const calculatedTotalAmount = totalAmount + deliveryFee;
    return { totalAmount, deliveryFee, calculatedTotalAmount };
  },
});

/**
 * get: () => boolean
 * set: (newValue: 변경할 boolean 값) => void
 * 전체 선택 체크 시 모든 itemDetailsState의 isChecked 변경,
 * LocalStorage 업데이트
 */
export const toggleAllSelector = selector<boolean>({
  key: 'toggleAllSelector',
  get: ({ get }): boolean => {
    const items: CartItems[] = get(itemsState);
    return items.every((item) => get(itemDetailsState(item.id)).isChecked);
  },
  set: ({ get, set }, newValue: boolean | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const items: CartItems[] = get(itemsState);
    items.forEach((item) => {
      set(itemDetailsState(item.id), (prev) => ({
        ...prev,
        isChecked: newValue,
      }));
      updateLocalStorage({ id: item.id, isChecked: newValue });
    });
  },
});

/**
 * 모든 itemDetailsState를 순회하며 총 수량 계산
 */
export const totalCountSelector = selector({
  key: 'totalCountSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const totalItemTypeCount = productIds.length;

    const totalCount = productIds.reduce((prevTotalCount, itemsState) => {
      const { quantity, isChecked } = get(itemDetailsState(itemsState.id));
      if (isChecked) {
        return prevTotalCount + quantity;
      }
      return prevTotalCount;
    }, 0);
    return { totalItemTypeCount, totalCount };
  },
});

/**
 * 선택된 모든 item을 배열로 반환하는 함수
 */
export const checkedItemsSelector = selector({
  key: 'checkedItemsSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const checkedItem = productIds.reduce<CartItems[]>((prev, item) => {
      const temp = get(itemDetailsState(item.id));
      if (temp.isChecked) {
        prev.push({
          ...item,
          quantity: temp.quantity,
        });
      }
      return prev;
    }, []);
    return checkedItem;
  },
});

export const allCheckedCoupons = selector({
  key: 'resetAllCoupons',
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons
      .map((coupon) => {
        return { ...coupon, isChecked: get(couponDetailState(coupon.id)) };
      })
      .filter((value) => value.isChecked);
  },
});

export const useResetAllCoupons = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const coupons = await snapshot.getPromise(couponsState);
        coupons.forEach((coupon) => {
          set(couponDetailState(coupon.id), false);
        });
      },
    [],
  );
};

export const totalDiscount = selector({
  key: 'totalDiscountSelector',
  get: ({ get }) => {
    const checkedCoupons = get(allCheckedCoupons);
    const totalAmount = get(totalPriceSelector);
  },
});
