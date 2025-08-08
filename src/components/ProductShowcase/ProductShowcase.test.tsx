import { render } from "utils/test-utils";
import "@testing-library/jest-dom";
import ProductShowcase from ".";
import * as ProductsHook from "hooks/useProducts";
import * as CartHook from "hooks/useCart";
import * as SearchHook from "hooks/useSearch";
import { IProduct } from "types/Product";
import { screen, fireEvent } from "@testing-library/dom";

jest.mock("hooks/useProducts");
jest.mock("hooks/useCart");
jest.mock("hooks/useSearch");

const mockUseProducts = ProductsHook.useProducts as jest.Mock;
const mockUseCart = CartHook.useCart as jest.Mock;
const mockUseSearch = SearchHook.useSearch as jest.Mock;

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Creme Hidratante",
    description: "Para pele sensível",
    price: 75,
    image: "img1.jpg",
    tags: [],
  },
  {
    id: "2",
    name: "Loção de Limpeza",
    description: "Remove impurezas",
    price: 45,
    image: "img2.jpg",
    tags: [],
  },
];

describe("ProductShowcase Component", () => {
  const mockLoadProducts = jest.fn();
  const mockHandleAddItem = jest.fn();
  const mockGetProductById = (id: string) =>
    mockProducts.find((p) => p.id === id);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue({ handleAddItem: mockHandleAddItem });
    mockUseSearch.mockReturnValue({ term: "" });
  });

  it("deve chamar loadProducts na montagem se não houver produtos", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      loadProducts: mockLoadProducts,
      getProductById: jest.fn(),
    });
    render(<ProductShowcase />);
    expect(mockLoadProducts).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar a mensagem de carregamento", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      loadProducts: jest.fn(),
      getProductById: jest.fn(),
    });
    render(<ProductShowcase />);
    expect(screen.getByText("Carregando produtos...")).toBeInTheDocument();
  });

  it("deve renderizar a mensagem de erro", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: "Falha na API",
      loadProducts: jest.fn(),
      getProductById: jest.fn(),
    });
    render(<ProductShowcase />);
    expect(
      screen.getByText("Erro ao carregar produtos: Falha na API")
    ).toBeInTheDocument();
  });

  it("deve renderizar produtos e chamar handleAddItem ao clicar em comprar", () => {
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      loadProducts: jest.fn(),
      getProductById: mockGetProductById,
    });
    render(<ProductShowcase />);

    expect(screen.getByText("Creme Hidratante")).toBeInTheDocument();

    const buyButton = screen.getAllByTestId("product-buy-button")[0];
    fireEvent.click(buyButton);

    expect(mockHandleAddItem).toHaveBeenCalledTimes(1);
    expect(mockHandleAddItem).toHaveBeenCalledWith(mockProducts[0]);
  });
});
