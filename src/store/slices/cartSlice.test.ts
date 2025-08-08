import cartReducer, {
  addItem,
  removeItem,
  removeFromCart,
  toggleCart,
  CartState,
  CartItem,
} from "./cartSlice";

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const mockProduct: Omit<CartItem, "quantity"> = {
  id: "1",
  name: "Sérum Hidratante",
  price: 150,
  image: "serum.jpg",
};

describe("cartSlice", () => {
  it("deve retornar o estado inicial", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("deve adicionar um novo item ao carrinho", () => {
    const state = cartReducer(initialState, addItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it("deve incrementar a quantidade de um item existente", () => {
    const stateWithItem = cartReducer(initialState, addItem(mockProduct));
    const state = cartReducer(stateWithItem, addItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("deve decrementar a quantidade de um item", () => {
    const stateWithItem = cartReducer(initialState, addItem(mockProduct));
    const stateWithTwoItems = cartReducer(stateWithItem, addItem(mockProduct));
    const state = cartReducer(stateWithTwoItems, removeItem({ id: "1" }));
    expect(state.items[0].quantity).toBe(1);
  });

  it("deve remover um item se a quantidade for 1 ao decrementar", () => {
    const stateWithItem = cartReducer(initialState, addItem(mockProduct));
    const state = cartReducer(stateWithItem, removeItem({ id: "1" }));
    expect(state.items).toHaveLength(0);
  });

  it("deve remover um item completamente do carrinho", () => {
    const stateWithItem = cartReducer(initialState, addItem(mockProduct));
    const state = cartReducer(stateWithItem, removeFromCart({ id: "1" }));
    expect(state.items).toHaveLength(0);
  });

  it("deve alternar a visibilidade do carrinho", () => {
    let state = cartReducer(initialState, toggleCart());
    expect(state.isCartOpen).toBe(true);
    state = cartReducer(state, toggleCart());
    expect(state.isCartOpen).toBe(false);
  });
});
