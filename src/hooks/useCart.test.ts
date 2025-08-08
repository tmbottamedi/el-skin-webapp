import { renderHook, act } from "@testing-library/react";
import { useCart } from "./useCart";
import * as Redux from "react-redux";
import { CartItem } from "store/slices/cartSlice";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(Redux, "useDispatch");
const mockedUseSelector = jest.spyOn(Redux, "useSelector");

const mockDispatch = jest.fn();

const mockItem: Omit<CartItem, "quantity"> = {
  id: "1",
  name: "Produto Teste",
  price: 100,
  image: "test.jpg",
};

describe("useCart Hook", () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockedUseSelector.mockClear();
    mockDispatch.mockClear();
  });

  it("deve retornar o estado inicial do carrinho", () => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({ cart: { items: [], isCartOpen: false } })
    );

    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);
    expect(result.current.quantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("deve chamar o dispatch para adicionar um item", () => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({ cart: { items: [], isCartOpen: false } })
    );
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.handleAddItem(mockItem);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/addItem",
      payload: mockItem,
    });
  });

  it("deve calcular o total e a quantidade corretamente", () => {
    const items = [
      { ...mockItem, quantity: 2 },
      { id: "2", name: "Outro", price: 50, image: "img.png", quantity: 1 },
    ];
    mockedUseSelector.mockImplementation((selector) =>
      selector({ cart: { items, isCartOpen: false } })
    );

    const { result } = renderHook(() => useCart());

    expect(result.current.quantity).toBe(3);
    expect(result.current.totalPrice).toBe(250);
  });

  it("deve chamar o dispatch para abrir e fechar o carrinho", () => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({ cart: { items: [], isCartOpen: false } })
    );
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.handleCartToggle();
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "cart/toggleCart" });
  });
});
