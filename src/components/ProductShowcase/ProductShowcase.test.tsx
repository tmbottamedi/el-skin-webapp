import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductShowcase from ".";
import { CartProvider } from "context/CartContext";
import { SearchProvider } from "context/SearchContext";
import * as useProductsHook from "hooks/useProducts";
import { IProduct } from "types/Product";

// Mock para o context do carrinho
const mockAddItem = jest.fn();
jest.mock("context/CartContext", () => ({
  ...jest.requireActual("context/CartContext"),
  useCartContext: () => ({
    addItem: mockAddItem,
    getItemQuantity: () => 0,
  }),
}));

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Produto Queridinho 1",
    description: "Descrição do produto 1",
    price: 150,
    image: "img1.jpg",
    tags: ["tag1"],
  },
];

describe("ProductShowcase Component", () => {
  beforeEach(() => {
    // Limpa mocks antes de cada teste
    mockAddItem.mockClear();
    jest
      .spyOn(useProductsHook, "useProducts")
      .mockReturnValue({ products: mockProducts });
  });

  const renderComponent = () => {
    return render(
      <CartProvider>
        <SearchProvider>
          <ProductShowcase />
        </SearchProvider>
      </CartProvider>
    );
  };

  it("deve renderizar o título e os produtos", () => {
    renderComponent();
    expect(
      screen.getByText("nossos queridinhos estão aqui")
    ).toBeInTheDocument();
    expect(screen.getByText("Produto Queridinho 1")).toBeInTheDocument();
  });

  it("deve chamar a função addItem do contexto ao clicar em comprar", () => {
    renderComponent();

    const buyButton = screen.getByTestId("product-buy-button");
    fireEvent.click(buyButton);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith({
      ...mockProducts[0],
      quantity: 1,
    });
  });
});
