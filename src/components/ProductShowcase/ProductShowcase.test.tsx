import { render } from "utils/test-utils";
import "@testing-library/jest-dom";
import ProductShowcase from ".";
import * as ProductsHook from "hooks/useProducts";
import * as CartHook from "hooks/useCart";
import { IProduct } from "types/Product";
import { screen, fireEvent } from "@testing-library/dom";

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Produto Vitamina C",
    description: "Descrição do produto 1",
    price: 99.99,
    image: "/image1.jpg",
    tags: ["Proteção"],
  },
];

const mockUseProducts = jest.spyOn(ProductsHook, "useProducts");
const mockUseCart = jest.spyOn(CartHook, "useCart");
const mockHandleAddItem = jest.fn();

describe("ProductShowcase Component", () => {
  beforeEach(() => {
    mockUseProducts.mockReturnValue({ products: mockProducts });
    mockUseCart.mockReturnValue({
      items: [],
      totalPrice: 0,
      quantity: 0,
      handleAddItem: mockHandleAddItem,
      handleRemoveItem: jest.fn(),
      handleRemoveFromCart: jest.fn(),
      isCartOpen: false,
      handleCartToggle: jest.fn(),
      getItemQuantity: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("deve renderizar o título e os produtos", () => {
    render(<ProductShowcase />);
    expect(
      screen.getByText("nossos queridinhos estão aqui")
    ).toBeInTheDocument();
    expect(screen.getByText("Produto Vitamina C")).toBeInTheDocument();
  });

  it("deve chamar handleAddItem ao clicar em comprar", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(<ProductShowcase />);

    const buyButton = screen.getByTestId("product-buy-button");
    fireEvent.click(buyButton);

    expect(mockHandleAddItem).toHaveBeenCalledTimes(1);
    expect(mockHandleAddItem).toHaveBeenCalledWith(mockProducts[0]);

    // Verifica se a propagação do evento foi parada
    expect(consoleSpy).not.toHaveBeenCalledWith("Produto clicado: 1");
    consoleSpy.mockRestore();
  });

  it("deve chamar o productClick handler ao clicar no card", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(<ProductShowcase />);

    const productCard = screen.getByTestId("product-card");
    fireEvent.click(productCard);

    expect(consoleSpy).toHaveBeenCalledWith("Produto clicado: 1");
    consoleSpy.mockRestore();
  });
});
