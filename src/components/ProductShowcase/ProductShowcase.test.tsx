import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";
import ProductShowcase from ".";
import { render } from "utils/test-utils";

const mockProducts = [
  {
    id: "1",
    name: "Produto 1",
    description: "Descrição do produto 1",
    price: 99.99,
    image: "/image1.jpg",
    tags: ["Proteção", "protection"],
  },
  {
    id: "2",
    name: "Produto 2",
    description: "Descrição do produto 2",
    price: 149.99,
    image: "/image2.jpg",
    tags: ["Rosto", "face"],
  },
];

// Mock dos serviços
jest.mock("service/productService", () => ({
  productService: {
    getProducts: () => mockProducts,
  },
}));

// Mock do SearchContext para controlar o termo de busca
let mockSearchTerm = "";

const mockAddItem = jest.fn();

jest.mock("context/SearchContext", () => {
  const React = require("react");
  return {
    __esModule: true,
    useSearchContext: () => ({ search: mockSearchTerm }),
    SearchProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock("context/CartContext", () => {
  const React = require("react");
  return {
    __esModule: true,
    useCartContext: () => ({
      addItem: mockAddItem,
      getItemQuantity: jest.fn().mockReturnValue(0),
    }),
    CartProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const renderWithAct = async () => {
  let component;
  await act(async () => {
    component = render(<ProductShowcase />);
  });
  return component;
};

test("componente ProductShowcase deve ser renderizado", async () => {
  await renderWithAct();

  expect(screen.getByText("nossos queridinhos estão aqui")).toBeInTheDocument();
});

test("deve exibir produtos corretamente", async () => {
  await renderWithAct();

  expect(screen.getByText("Produto 1")).toBeInTheDocument();
  expect(screen.getByText("Descrição do produto 1")).toBeInTheDocument();
  expect(screen.getByText("R$ 99,99")).toBeInTheDocument();

  expect(screen.getByText("Produto 2")).toBeInTheDocument();
  expect(screen.getByText("Descrição do produto 2")).toBeInTheDocument();
  expect(screen.getByText("R$ 149,99")).toBeInTheDocument();
});

test("Deve chamar console.log ao clicar no produto", async () => {
  const consoleSpy = jest
    .spyOn(console, "log")
    .mockImplementation(() => undefined);

  await renderWithAct();

  const productCard = screen.getByText("Produto 1");
  productCard.click();

  expect(consoleSpy).toHaveBeenCalledWith("Produto clicado: 1");

  consoleSpy.mockRestore();
});

test("Deve chamar addItem ao clicar no botão comprar", async () => {
  await renderWithAct();
  const buyButtons = screen.getAllByTestId("product-buy-button");
  buyButtons[0].click();
  expect(mockAddItem).toHaveBeenCalledTimes(1);
  expect(mockAddItem).toHaveBeenCalledWith({
    ...mockProducts[0],
    quantity: 1,
  });
});

test("Deve filtrar produtos com base no termo de busca", async () => {
  mockSearchTerm = "Produto 1";
  await renderWithAct();

  expect(screen.getByText("Produto 1")).toBeInTheDocument();
  expect(screen.queryByText("Produto 2")).not.toBeInTheDocument();
});
