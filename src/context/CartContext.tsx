import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
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

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { totalTemp, quantityTemp } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalTemp += item.price * item.quantity;
        acc.quantityTemp += item.quantity;
        return acc;
      },
      { totalTemp: 0, quantityTemp: 0 }
    );
  }, [items]);

  useEffect(() => {
    setTotalPrice(totalTemp);
    setQuantity(quantityTemp);
  }, [totalTemp, quantityTemp]);

  const handleCartToggle = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const getItemQuantity = useCallback(
    (id: string): number => {
      const item = items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    [items]
  );

  const addItem = useCallback(
    (item: CartItem) => {
      const existingItem = items.find((i) => i.id === item.id);
      if (existingItem) {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        setItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      }
    },
    [items]
  );

  const removeItem = useCallback(
    (id: string) => {
      const existingItem = items.find((i) => i.id === id);
      if (!existingItem) return;
      if (existingItem.quantity > 1) {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      } else {
        setItems((prevItems) => prevItems.filter((i) => i.id !== id));
      }
    },
    [items]
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      removeFromCart,
      getItemQuantity,
      isCartOpen,
      handleCartToggle,
      quantity,
      totalPrice,
    }),
    [
      items,
      addItem,
      removeItem,
      removeFromCart,
      getItemQuantity,
      isCartOpen,
      handleCartToggle,
      quantity,
      totalPrice,
    ]
  );

  return <CartContext value={contextValue}>{children}</CartContext>;
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
