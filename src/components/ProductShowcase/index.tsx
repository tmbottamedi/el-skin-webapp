import "./ProductShowcase.css";
import ProductCard, { IProduct } from "../ProductCard";
import { useState, useEffect } from "react";
import { productService } from "service/productService";

export default function ProductShowcase() {
  const title = "nossos queridinhos estão aqui";
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productService.getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Comprar produto: ${productId}`);
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <h2 className="product-grid-title">{title}</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
