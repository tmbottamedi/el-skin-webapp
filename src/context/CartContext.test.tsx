import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartProvider, useCartContext } from "./CartContext";
import { useCart } from "hooks/useCart";
import { render } from "utils/test-utils";

// Mock do hook useCart
jest.mock("hooks/useCart");
const mockedUseCart = useCart as jest.MockedFunction<typeof useCart>;

const TestComponent = () => {
  const { quantity } = useCartContext();
  return <div>Quantidade no Carrinho: {quantity}</div>;
};

const ErrorComponent = () => {
  const context = useCartContext();
  return <div>{context ? "Contexto Ok" : "Sem Contexto"}</div>;
};

describe("CartContext", () => {
  it("deve prover os valores do carrinho para os componentes filhos", () => {
    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: false,
      quantity: 5,
      totalPrice: 150,
      addItem: jest.fn(),
      removeItem: jest.fn(),
      removeFromCart: jest.fn(),
      handleCartToggle: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByText("Quantidade no Carrinho: 5")).toBeInTheDocument();
  });

  it("deve lançar um erro se useCartContext for usado fora de um CartProvider", () => {
    // Suprime o erro esperado do console para manter o output do teste limpo
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<ErrorComponent />)).toThrow(
      "useCartContext must be used within a CartProvider"
    );

    consoleErrorSpy.mockRestore();
  });
});
