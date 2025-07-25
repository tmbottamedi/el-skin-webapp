import ProductCard from "components/ProductCard";
import "./ProductShowcase.css";
import { useCartContext } from "context/CartContext";
import { IProduct } from "types/Product";
import { useProducts } from "hooks/useProducts";

function ProductShowcase() {
  const title = "nossos queridinhos estão aqui";
  const { products } = useProducts();
  const { addItem, getItemQuantity } = useCartContext();

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (product: IProduct, event: React.MouseEvent) => {
    event.stopPropagation();
    addItem({
      ...product,
      quantity: getItemQuantity(product.id) + 1,
    });
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

export default ProductShowcase;
