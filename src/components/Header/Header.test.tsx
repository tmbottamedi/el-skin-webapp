import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from ".";
import { SearchProvider } from "context/SearchContext";
import { CartProvider } from "context/CartContext";
import { useCart } from "hooks/useCart";
import { render } from "utils/test-utils";

jest.mock("hooks/useCart");
const mockedUseCart = useCart as jest.Mock;

const renderHeader = () => {
  return render(
    <Header />
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    mockedUseCart.mockClear();
  });

  it("deve renderizar o logo e a barra de pesquisa", () => {
    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: false,
      quantity: 0,
      handleCartToggle: jest.fn(),
    });
    renderHeader();
    expect(screen.getByText("AL SKIN")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("O que você está procurando?")
    ).toBeInTheDocument();
  });

  it("deve atualizar o valor da pesquisa ao digitar no input", () => {
    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: false,
      quantity: 0,
      handleCartToggle: jest.fn(),
    });
    renderHeader();
    const searchInput = screen.getByPlaceholderText(
      "O que você está procurando?"
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Sérum" } });
    expect(searchInput.value).toBe("Sérum");
  });

  it("deve chamar a função de pesquisa ao clicar no botão", () => {
    const consoleSpy = jest.spyOn(console, "log");
    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: false,
      quantity: 0,
      handleCartToggle: jest.fn(),
    });
    renderHeader();
    const searchInput = screen.getByPlaceholderText(
      "O que você está procurando?"
    );
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "Vitamina C" } });
    fireEvent.click(searchButton);

    expect(consoleSpy).toHaveBeenCalledWith("Você pesquisou por: Vitamina C");
    consoleSpy.mockRestore();
  });

  it("deve abrir e fechar o modal do carrinho ao clicar no botão", () => {
    const handleCartToggle = jest.fn();
    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: false,
      quantity: 0,
      handleCartToggle: handleCartToggle,
    });

    const { rerender } = render(
      <Header />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const cartButton = screen.getByTestId("shop-button");
    fireEvent.click(cartButton);

    expect(handleCartToggle).toHaveBeenCalledTimes(1);

    mockedUseCart.mockReturnValue({
      items: [],
      isCartOpen: true,
      quantity: 0,
      handleCartToggle: handleCartToggle,
    });

    rerender(
      <Header />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  describe("Contador do Carrinho", () => {
    it("não deve exibir o número quando a quantidade for 0", () => {
      mockedUseCart.mockReturnValue({
        items: [],
        isCartOpen: true,
        quantity: 0,
      });
      renderHeader();
      const cartButton = screen.getByTestId("shop-button");
      const span = cartButton.querySelector("span");
      expect(span).toBeNull();
    });

    it("deve exibir a quantidade correta quando há itens no carrinho", () => {
      mockedUseCart.mockReturnValue({
        items: [],
        isCartOpen: true,
        quantity: 5,
      });

      renderHeader();
      const cartButton = screen.getByTestId("shop-button");
      const span = cartButton.querySelector("span");
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent("5");
    });
  });
});
