import { render } from "utils/test-utils";
import "@testing-library/jest-dom";
import { SWRConfig } from "swr";
import ProductShowcase from ".";
import { useCart } from "hooks/useCart";
import { useSearch } from "hooks/useSearch";
import { IProduct } from "types/Product";
import { screen, waitFor, fireEvent } from "@testing-library/react";

jest.mock("hooks/useCart");
jest.mock("hooks/useSearch");

const mockedUseCart = useCart as jest.Mock;
const mockedUseSearch = useSearch as jest.Mock;

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Sérum Vitamina C",
    description: "Antioxidante poderoso para a sua pele.",
    price: 150,
    image: "vitamina-c.jpg",
    tags: ["rosto"],
  },
  {
    id: "2",
    name: "Protetor Solar FPS 50",
    description: "Proteção diária contra raios UVA/UVB.",
    price: 80,
    image: "protetor-solar.jpg",
    tags: ["proteção"],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderProductShowcase = (fallbackData: any) => {
  return render(
    <SWRConfig
      value={{ provider: () => new Map(Object.entries(fallbackData)) }}
    >
      <ProductShowcase />
    </SWRConfig>
  );
};

describe("ProductShowcase Component", () => {
  const mockHandleAddItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseCart.mockReturnValue({ handleAddItem: mockHandleAddItem });
    mockedUseSearch.mockReturnValue({ term: "" });
  });

  it("deve exibir uma mensagem de erro se a obtenção de dados falhar", async () => {
    const error = new Error("Falha na API");
    renderProductShowcase({
      "/api/products": { error },
    });

    await waitFor(() => {
      expect(screen.getByText("Erro ao carregar produtos")).toBeInTheDocument();
    });
  });

  it("deve renderizar a lista de produtos quando os dados são obtidos com sucesso", async () => {
    renderProductShowcase({
      "/api/products": { data: mockProducts },
    });

    await waitFor(() => {
      expect(screen.getByText("Sérum Vitamina C")).toBeInTheDocument();
      expect(screen.getByText("Protetor Solar FPS 50")).toBeInTheDocument();
    });
  });

  it("deve filtrar os produtos com base no termo de pesquisa do useSearch", async () => {
    mockedUseSearch.mockReturnValue({ term: "Vitamina" });

    renderProductShowcase({
      "/api/products": { data: mockProducts },
    });

    await waitFor(() => {
      expect(screen.getByText("Sérum Vitamina C")).toBeInTheDocument();
      expect(
        screen.queryByText("Protetor Solar FPS 50")
      ).not.toBeInTheDocument();
    });
  });

  it("deve chamar handleAddItem com o produto correto ao clicar em 'comprar'", async () => {
    renderProductShowcase({
      "/api/products": { data: mockProducts },
    });

    const buyButtons = await screen.findAllByTestId("product-buy-button");

    fireEvent.click(buyButtons[0]);

    expect(mockHandleAddItem).toHaveBeenCalledTimes(1);
    expect(mockHandleAddItem).toHaveBeenCalledWith(mockProducts[0]);
  });
});
