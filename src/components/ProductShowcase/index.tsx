import ProductCard from "components/ProductCard";
import "./ProductShowcase.css";

const numberOfProducts = 8;

export default function ProductShowcase() {
  return (
    <div className="product-showcase">
      <h2 className="product-showcase-title">nossos queridinhos estão aqui</h2>
      <div className="product-showcase-grid">
        {Array.from({ length: numberOfProducts }, (_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
