import ProductCard from "components/ProductCard";
import "./ProductShowcase.css";

const product = {
  name: "Protetor solar AL SUN",
  description: "alta proteção e pele luminosa sem grude nem pele cinzenta",
  price: "R$ 79,90",
  tags: ["proteção", "rosto"],
};

const products = Array.from({ length: 8 }, () => product);

export default function ProductShowcase() {
  return (
    <div className="product-showcase">
      <h2 className="product-showcase-title">nossos queridinhos estão aqui</h2>
      <div className="product-showcase-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            tags={product.tags}
          />
        ))}
      </div>
    </div>
  );
}
