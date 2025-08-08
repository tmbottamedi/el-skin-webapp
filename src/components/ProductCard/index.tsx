import React from "react";
import { IProduct } from "types/Product";
import styled from "styled-components";

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
    // eslint-disable-next-line
    <Card
      data-testid="product-card"
      type="button"
      onClick={() => onProductClick(product.id)}
    >
      <ProductImage>
        <img src={product.image} alt={product.name} />
      </ProductImage>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductTags>
          {product.tags.map((tag) => (
            <ProductTag key={`${product.id}-${tag}`}>{tag}</ProductTag>
          ))}
        </ProductTags>
        <ProductFooter>
          <ProductPrice>{formatPrice(product.price)}</ProductPrice>
          <ProductBuyButton
            data-testid="product-buy-button"
            onClick={(e) => onBuyClick(product.id, e)}
            type="button"
          >
            comprar
          </ProductBuyButton>
        </ProductFooter>
      </ProductInfo>
    </Card>
  );
};

const Card = styled.a`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  padding: 0;
  text-align: left;
  font-family: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #c8b99c;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeight.normal};
`;

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ProductTag = styled.span`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ theme }) => theme.colors.tag.protection.bg};
  color: ${({ theme }) => theme.colors.tag.protection.text};
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProductBuyButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-transform: lowercase;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryGradientHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.primary};
  }
`;

export default ProductCard;
