import ProductCard from "components/ProductCard";
import styled from "styled-components";
import { useCart } from "hooks/useCart";
import { useSearch } from "hooks/useSearch";
import { useCallback, useMemo } from "react";
import { useGetProductsQuery } from "store/api/apiSlice";

function ProductShowcase() {
  const title = "nossos queridinhos estão aqui";
  const { term } = useSearch();
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const { handleAddItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (!term) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );
  }, [term, products]);

  const getProductById = useCallback(
    (id: string) => {
      return products.find((product) => product.id === id);
    },
    [products]
  );

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = useCallback(
    (productId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      console.log(`Comprar produto: ${productId}`);

      const produtoComprado = getProductById(productId);

      if (!produtoComprado) {
        console.error(`Produto com ID ${productId} não encontrado.`);
        return;
      }

      handleAddItem(produtoComprado);
    },
    [getProductById, handleAddItem]
  );

  if (isLoading) {
    return (
      <ProductGridSection>
        <ProductGridContainer>
          <ProductGridTitle>{title}</ProductGridTitle>
          <ProductGrid>
            <p>Carregando produtos...</p>
          </ProductGrid>
        </ProductGridContainer>
      </ProductGridSection>
    );
  }

  if (error) {
    return (
      <ProductGridSection>
        <ProductGridContainer>
          <ProductGridTitle>{title}</ProductGridTitle>
          <ProductGrid>
            <p>Erro ao carregar produtos</p>
          </ProductGrid>
        </ProductGridContainer>
      </ProductGridSection>
    );
  }

  return (
    <ProductGridSection>
      <ProductGridContainer>
        <ProductGridTitle>{title}</ProductGridTitle>

        <ProductGrid>
          {filteredProducts.map((product) => (
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
