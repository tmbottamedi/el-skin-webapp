import { API_CONFIG } from "../config/APIConfig";
import api from "./api";
import { productService } from "./productService";
import { IProduct } from "types/Product";

jest.mock("./api");

const mockedApi = api as jest.Mocked<typeof api>;

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição 1",
    price: 10,
    image: "imagem1.jpg",
    tags: ["tag1"],
  },
  {
    id: "2",
    name: "Produto 2",
    description: "Descrição 2",
    price: 20,
    image: "imagem2.jpg",
    tags: ["tag2"],
  },
];

describe("productService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("deve retornar uma lista de produtos", async () => {
      mockedApi.get.mockResolvedValue({ data: mockProducts });

      const products = await productService.getProducts();

      expect(products).toEqual(mockProducts);
      expect(mockedApi.get).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.PRODUCTS);
    });
  });

  describe("getProductById", () => {
    it("deve retornar um único produto pelo id", async () => {
      const mockProduct = mockProducts[0];
      mockedApi.get.mockResolvedValue({ data: mockProduct });

      const product = await productService.getProductById("1");

      expect(product).toEqual(mockProduct);
      expect(mockedApi.get).toHaveBeenCalledWith(
        `${API_CONFIG.ENDPOINTS.PRODUCTS}/1`
      );
    });
  });
});
