/* eslint-disable indent */
import { CartItem } from "hooks/useCart";

export const ADD_ITEM = "ADD_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const TOGGLE_CART = "TOGGLE_CART";

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

type Action =
  | { type: typeof ADD_ITEM; payload: CartItem }
  | { type: typeof DECREMENT_ITEM; payload: string }
  | { type: typeof REMOVE_FROM_CART; payload: string }
  | { type: typeof TOGGLE_CART };

export const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        const updatedItems = [...state.items, { ...newItem, quantity: 1 }];
        return { ...state, items: updatedItems };
      }
    }

    case DECREMENT_ITEM: {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (!existingItem) {
        return state;
      }
      if (existingItem.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        return { ...state, items: updatedItems };
      } else {
        const updatedItems = state.items.filter((item) => item.id !== itemId);
        return { ...state, items: updatedItems };
      }
    }

    case REMOVE_FROM_CART: {
      const itemId = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      return { ...state, items: updatedItems };
    }

    case TOGGLE_CART: {
      return { ...state, isCartOpen: !state.isCartOpen };
    }

    default:
      return state;
  }
};
