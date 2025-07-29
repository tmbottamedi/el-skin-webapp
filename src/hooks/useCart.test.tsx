import { renderHook, act } from "@testing-library/react";
import { useCart, CartItem } from "./useCart";

const mockItem: CartItem = {
  id: "1",
  name: "Produto Teste",
  price: 100,
  quantity: 1,
  image: "test.jpg",
};

const mockItem2: CartItem = {
  id: "2",
  name: "Produto Teste 2",
  price: 50,
  quantity: 1,
  image: "test2.jpg",
};

describe("useCart Hook", () => {
  it("deve inicializar com o carrinho vazio e fechado", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);
    expect(result.current.quantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("deve adicionar um novo item ao carrinho", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...mockItem, quantity: 1 });
    expect(result.current.quantity).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });

  it("deve incrementar a quantidade de um item existente", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.quantity).toBe(2);
    expect(result.current.totalPrice).toBe(200);
  });

  it("deve decrementar a quantidade de um item", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.removeItem(mockItem.id);
    });

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.quantity).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });

  it("deve remover um item se a quantidade for 1 ao decrementar", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.removeItem(mockItem.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("deve remover um item completamente do carrinho", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.addItem(mockItem2);
    });
    act(() => {
      result.current.removeFromCart(mockItem.id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe("2");
    expect(result.current.quantity).toBe(1);
    expect(result.current.totalPrice).toBe(50);
  });

  it("deve alternar a visibilidade do modal do carrinho", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.isCartOpen).toBe(false);

    act(() => {
      result.current.handleCartToggle();
    });

    expect(result.current.isCartOpen).toBe(true);

    act(() => {
      result.current.handleCartToggle();
    });

    expect(result.current.isCartOpen).toBe(false);
  });

  it("deve retornar a quantidade correta para um item específico", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockItem);
    });
    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.getItemQuantity(mockItem.id)).toBe(2);
    expect(result.current.getItemQuantity("id-inexistente")).toBe(0);
  });
});
