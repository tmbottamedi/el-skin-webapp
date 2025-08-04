import { renderHook, act } from "@testing-library/react";
import { useProducts } from "./useProducts";
import { productService } from "service/productService";
import * as SearchHook from "hooks/useSearch";

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
  const mockUseSearchHook = jest.spyOn(SearchHook, "useSearch");

  beforeEach(() => {
    mockedProductService.getProducts.mockResolvedValue(mockProducts);
  });

  it("deve buscar e retornar todos os produtos sem termo de busca", async () => {
    mockUseSearchHook.mockReturnValue({ term: "", setTerm: jest.fn() });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toEqual(mockProducts);
  });

  it("deve filtrar os produtos pelo nome", async () => {
    mockUseSearchHook.mockReturnValue({
      term: "Sérum",
      setTerm: jest.fn(),
    });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe("Sérum Vitamina C");
  });

  it("deve filtrar os produtos pela descrição", async () => {
    mockUseSearchHook.mockReturnValue({
      term: "Proteção",
      setTerm: jest.fn(),
    });
    const { result } = renderHook(() => useProducts());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe("Protetor Solar");
  });
});
