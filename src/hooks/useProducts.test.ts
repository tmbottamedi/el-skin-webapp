import { renderHook, act } from "@testing-library/react";
import { useProducts } from "./useProducts";
import * as Redux from "react-redux";
import { IProduct } from "types/Product";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(Redux, "useDispatch");
const mockedUseSelector = jest.spyOn(Redux, "useSelector");

const mockDispatch = jest.fn();

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Sérum Hidratante",
    description: "Para pele seca",
    price: 100,
    image: "img1.jpg",
    tags: [],
  },
  {
    id: "2",
    name: "Protetor Solar FPS 50",
    description: "Proteção para o rosto",
    price: 80,
    image: "img2.jpg",
    tags: [],
  },
];

describe("useProducts Hook", () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockedUseSelector.mockClear();
    mockDispatch.mockClear();
  });

  it("deve retornar o estado inicial da slice de produtos", () => {
    // Arrange
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: [], loading: false, error: null },
      })
    );

    // Act
    const { result } = renderHook(() => useProducts());

    // Assert
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.totalProducts).toBe(0);
  });

  it("deve chamar o dispatch para carregar os produtos", () => {
    // Arrange
    mockedUseSelector.mockImplementation((selector) =>
      selector({ products: { items: [], loading: false, error: null } })
    );
    const { result } = renderHook(() => useProducts());

    // Act
    act(() => {
      result.current.loadProducts();
    });

    // Assert
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(typeof mockDispatch.mock.calls[0][0]).toBe("function");
  });

  it("deve retornar o número total de produtos corretamente", () => {
    // Arrange
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: mockProducts, loading: false, error: null },
      })
    );

    // Act
    const { result } = renderHook(() => useProducts());

    // Assert
    expect(result.current.totalProducts).toBe(2);
  });

  it("deve filtrar os produtos corretamente com base no termo de busca", () => {
    // Arrange
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: mockProducts, loading: false, error: null },
      })
    );
    const { result } = renderHook(() => useProducts());

    // Act
    const filtered = result.current.filteredProducts("Solar");

    // Assert
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe("Protetor Solar FPS 50");
  });

  it("deve encontrar um produto pelo ID com getProductById", () => {
    // Arrange
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        products: { items: mockProducts, loading: false, error: null },
      })
    );
    const { result } = renderHook(() => useProducts());

    // Act
    const product = result.current.getProductById("1");

    // Assert
    expect(product).toBeDefined();
    expect(product?.name).toBe("Sérum Hidratante");
  });
});
