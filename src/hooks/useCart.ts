import { useCallback, useReducer, useMemo } from "react";
import {
  cartReducer,
  CartState,
  ADD_ITEM,
  DECREMENT_ITEM,
  REMOVE_FROM_CART,
  TOGGLE_CART,
} from "reducers/cartReducer";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UseCartReturn {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  getItemQuantity: (id: string) => number;
  isCartOpen: boolean;
  handleCartToggle: () => void;
  quantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

export const useCart = (): UseCartReturn => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { totalPrice, quantity } = useMemo(() => {
    return state.items.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity;
        acc.quantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, quantity: 0 }
    );
  }, [state.items]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: ADD_ITEM, payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: DECREMENT_ITEM, payload: id });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  }, []);

  const handleCartToggle = useCallback(() => {
    dispatch({ type: TOGGLE_CART });
  }, []);

  const getItemQuantity = useCallback(
    (id: string): number => {
      const item = state.items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  return {
    ...state,
    addItem,
    removeItem,
    removeFromCart,
    handleCartToggle,
    getItemQuantity,
    quantity,
    totalPrice,
  };
};
