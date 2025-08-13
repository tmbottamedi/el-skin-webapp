"use client";
import ProductCard from "components/ProductCard";
import { useCart } from "hooks/useCart";
import { useSearch } from "hooks/useSearch";
import { useCallback, useMemo } from "react";
import { useGetProductsQuery } from "store/api/apiSlice";
import styles from "./ProductShowcase.module.css";

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
      const produtoComprado = getProductById(productId);
      if (!produtoComprado) {
        console.error(`Produto com ID ${productId} não encontrado.`);
        return;
      }
      handleAddItem(produtoComprado);
    },
    [getProductById, handleAddItem]
  );

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando produtos...</p>;
    }
    if (error) {
      return <p>Erro ao carregar produtos</p>;
    }
    return (
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={styles.productGridSection}>
      <div className={styles.productGridContainer}>
        <h2 className={styles.productGridTitle}>{title}</h2>
        {renderContent()}
      </div>
    </section>
  );
}

export default ProductShowcase;
