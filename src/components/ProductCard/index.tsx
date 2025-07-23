import React from "react";
import "./ProductCard.css";
import { IProduct } from "types/Product";

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (product: IProduct, event: React.MouseEvent) => void;
}

function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onBuyClick,
}) => {
  return (
    <button
      className="product-card"
      onClick={() => onProductClick(product.id)}
      type="button"
      tabIndex={0}
      aria-label={`Ver detalhes do produto ${product.name}`}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-tags">
          {product.tags.map((tag) => (
            <span
              key={`${product.id}-${tag}`}
              className={`product-tag product-tag--${tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            className="product-buy-button"
            onClick={(e) => onBuyClick(product, e)}
            type="button"
          >
            comprar
          </button>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
