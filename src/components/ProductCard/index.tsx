"use client";
import React from "react";
import { IProduct } from "types/Product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
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
    <a
      data-testid="product-card"
      className={styles.card}
      onClick={() => onProductClick(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onProductClick(product.id)}
    >
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productTags}>
          {product.tags.map((tag) => (
            <span key={`${product.id}-${tag}`} className={styles.productTag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>
            {formatPrice(product.price)}
          </span>
          <button
            data-testid="product-buy-button"
            className={styles.productBuyButton}
            onClick={(e) => onBuyClick(product.id, e)}
            type="button"
          >
            comprar
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
