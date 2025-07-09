import produto from "assets/produto.png";
import "./ProductCard.css";

export default function ProductCard() {
  return (
    <div className="product-card">
      <img src={produto} alt="Produto" className="product-image" />
      <h3 className="product-name">Protetor solar AL SUN</h3>
      <p className="product-description">
        alta proteção e pele luminosa sem grude nem pele cinzenta
      </p>
      <div className="product-tags">
        <span className="tag">proteção</span>
        <span className="tag">rosto</span>
      </div>
      <div className="product-buy">
        <h2 className="price">R$ 79,90</h2>
        <button className="buy-button">Comprar</button>
      </div>
    </div>
  );
}
