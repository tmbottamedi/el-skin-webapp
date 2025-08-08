import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  fetchProductById,
  clearError,
  ProductsState,
} from "./productsSlice";
import { productService } from "service/productService";
import { IProduct } from "types/Product";

// Mock the entire productService
jest.mock("service/productService");
const mockedProductService = productService as jest.Mocked<
  typeof productService
>;

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Produto 1",
    description: "Desc 1",
    price: 10,
    image: "img1.jpg",
    tags: [],
  },
  {
    id: "2",
    name: "Produto 2",
    description: "Desc 2",
    price: 20,
    image: "img2.jpg",
    tags: [],
  },
];

// Define the shape of the state for our tests
interface TestState {
  products: ProductsState;
}

// Corrected: Define a dispatch type that knows about thunks and uses UnknownAction
type TestDispatch = ThunkDispatch<TestState, unknown, UnknownAction>;

describe("productsSlice", () => {
  let store: ReturnType<typeof configureStore<TestState>> & {
    dispatch: TestDispatch;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  describe("reducers", () => {
    it("deve limpar o erro com clearError", () => {
      store.dispatch({
        type: "products/fetchProducts/rejected",
        error: { message: "Erro de teste" },
      });
      expect(store.getState().products.error).toBe("Erro de teste");

      store.dispatch(clearError());
      expect(store.getState().products.error).toBeNull();
    });
  });

  describe("async thunks: fetchProducts", () => {
    it("deve lidar com fulfilled e carregar os produtos com sucesso", async () => {
      mockedProductService.getProducts.mockResolvedValue(mockProducts);
      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockProducts);
    });

    it("deve lidar com rejected e definir a mensagem de erro", async () => {
      const errorMessage = "Não foi possível buscar os produtos";
      mockedProductService.getProducts.mockRejectedValue(
        new Error(errorMessage)
      );
      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("async thunks: fetchProductById", () => {
    it("deve adicionar um produto novo se ele não existir no estado", async () => {
      const newProduct = mockProducts[0];
      mockedProductService.getProductById.mockResolvedValue(newProduct);

      await store.dispatch(fetchProductById(newProduct.id));
      const state = store.getState().products;

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(newProduct);
    });

    it("deve atualizar um produto que já existe no estado", async () => {
      const updatedProduct = {
        ...mockProducts[0],
        name: "Nome do Produto Atualizado",
      };
      mockedProductService.getProductById.mockResolvedValue(updatedProduct);

      const preloadedState = {
        products: { items: [mockProducts[0]], loading: false, error: null },
      };
      store = configureStore({
        reducer: { products: productsReducer },
        preloadedState,
      });

      await store.dispatch(fetchProductById(updatedProduct.id));
      const state = store.getState().products;

      expect(state.items).toHaveLength(1);
      expect(state.items[0].name).toBe("Nome do Produto Atualizado");
    });
  });
});
