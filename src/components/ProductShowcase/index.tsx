import ProductCard from "components/ProductCard";
import { IProduct } from "types/Product";
import { useProducts } from "hooks/useProducts";
import styled from "styled-components";
import { useCart } from "hooks/useCart";

function ProductShowcase() {
  const title = "nossos queridinhos estão aqui";
  const { products } = useProducts();
  const { handleAddItem } = useCart();

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (product: IProduct, event: React.MouseEvent) => {
    event.stopPropagation();
    handleAddItem({
      ...product,
    });
  };

  return (
    <ProductGridSection>
      <ProductGridContainer>
        <ProductGridTitle className="product-grid-title">
          {title}
        </ProductGridTitle>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onBuyClick={handleBuyClick}
            />
          ))}
        </ProductGrid>
      </ProductGridContainer>
    </ProductGridSection>
  );
}

const ProductGridSection = styled.section`
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.colors.background.white};
`;

const ProductGridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGridTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 40px;
  font-family: "Arial", sans-serif;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  justify-items: center;
`;

export default ProductShowcase;
