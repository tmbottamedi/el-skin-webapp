import { renderHook, act } from "@testing-library/react";
import { useProducts } from "./useProducts";
import { productService } from "service/productService";
import * as SearchContext from "context/SearchContext";

jest.mock("service/productService");
const mockedProductService = productService as jest.Mocked<
  typeof productService
>;

const mockProducts = [
  {
    id: "1",
    name: "Sérum Vitamina C",
    description: "Antioxidante",
    price: 100,
    image: "",
    tags: [],
  },
  {
    id: "2",
    name: "Protetor Solar",
    description: "Proteção UVA/UVB",
    price: 80,
    image: "",
    tags: [],
  },
];

describe("useProducts Hook", () => {
  const mockUseSearchContext = jest.spyOn(SearchContext, "useSearchContext");

  beforeEach(() => {
    mockedProductService.getProducts.mockResolvedValue(mockProducts);
  });

  it("deve buscar e retornar todos os produtos sem termo de busca", async () => {
    mockUseSearchContext.mockReturnValue({ search: "", setSearch: jest.fn() });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toEqual(mockProducts);
  });

  it("deve filtrar os produtos pelo nome", async () => {
    mockUseSearchContext.mockReturnValue({
      search: "Sérum",
      setSearch: jest.fn(),
    });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe("Sérum Vitamina C");
  });

  it("deve filtrar os produtos pela descrição", async () => {
    mockUseSearchContext.mockReturnValue({
      search: "Proteção",
      setSearch: jest.fn(),
    });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe("Protetor Solar");
  });
});
