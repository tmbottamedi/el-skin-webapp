import produto from "assets/produto.png";
import "./ProductCard.css";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  tags: string[];
}

export default function ProductCard({
  name,
  description,
  price,
  tags,
}: Readonly<ProductCardProps>) {
  return (
    <div className="product-card">
      <img src={produto} alt="Produto" className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <div className="product-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="product-buy">
        <h2 className="price">{price}</h2>
        <button className="buy-button">Comprar</button>
      </div>
    </div>
  );
}
