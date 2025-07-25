import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from ".";
import { IProduct } from "types/Product";
const product: IProduct = {
  id: "1",
  name: "Produto Teste",
  description: "Descrição do produto teste",
  price: 99.99,
  image: "https://via.placeholder.com/150",
  tags: ["Proteção", "protection"],
};

const handleProductClick = jest.fn();
const handleBuyClick = jest.fn();

test("componente ProductCard deve ser renderizado", () => {
  // Act
  render(
    <ProductCard
      key={product.id}
      product={product}
      onProductClick={handleProductClick}
      onBuyClick={handleBuyClick}
    />
  );

  // Assert
  expect(screen.getByText("Produto Teste")).toBeInTheDocument();
});

test("deve acionar o método onProductClick quando o produto for clicado", () => {
  render(
    <ProductCard
      key={product.id}
      product={product}
      onProductClick={handleProductClick}
      onBuyClick={handleBuyClick}
    />
  );

  const card = screen.getByTestId("product-card");
  fireEvent.click(card);

  expect(handleProductClick).toBeCalledWith("1");
  expect(handleProductClick).toHaveBeenCalledTimes(1);
});

test("deve acionar o método onBuyClick quando o produto for clicado", () => {
  render(
    <ProductCard
      key={product.id}
      product={product}
      onProductClick={handleProductClick}
      onBuyClick={handleBuyClick}
    />
  );

  const card = screen.getByTestId("product-buy-button");
  fireEvent.click(card);

  expect(handleProductClick).toBeCalledWith("1");
  expect(handleProductClick).toHaveBeenCalledTimes(1);
});
