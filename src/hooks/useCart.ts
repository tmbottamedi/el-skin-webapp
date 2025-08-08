import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import type { RootState, AppDispatch } from "store";
import {
  addItem,
  removeItem,
  removeFromCart,
  toggleCart,
  CartItem,
} from "store/slices/cartSlice";

export interface UseCartReturn {
  items: CartItem[];
  handleAddItem: (item: Omit<CartItem, "quantity">) => void;
  handleRemoveItem: (id: string) => void;
  handleRemoveFromCart: (id: string) => void;
  getItemQuantity: (id: string) => number;
  isCartOpen: boolean;
  handleCartToggle: () => void;
  quantity: number;
  totalPrice: number;
}

export const useCart = (): UseCartReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const { totalPrice, quantity } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity;
        acc.quantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, quantity: 0 }
    );
  }, [items]);

  const handleAddItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      dispatch(addItem(item));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeItem({ id }));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart({ id }));
    },
    [dispatch]
  );

  const handleCartToggle = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const getItemQuantity = useCallback(
    (id: string): number => {
      const item = items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    [items]
  );

  return {
    items,
    isCartOpen,
    handleAddItem,
    handleRemoveItem,
    handleRemoveFromCart,
    handleCartToggle,
    getItemQuantity,
    quantity,
    totalPrice,
  };
};
