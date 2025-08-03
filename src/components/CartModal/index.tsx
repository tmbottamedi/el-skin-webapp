import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "context/CartContext";
import { CartItem } from "hooks/useCart";
import styled from "styled-components";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items }) => {
  const { addItem, removeItem, totalPrice, removeFromCart } = useCartContext();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <CartModalOverlay
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <CartModalContainer>
        <CartModalHeader>
          <h2 id="cart-modal-title">Carrinho</h2>
          <CartModalCloseButton data-testid="cart-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CartModalCloseButton>
        </CartModalHeader>

        <CartModalContent>
          {items.length === 0 ? (
            <CartEmpty><p>Seu carrinho está vazio</p></CartEmpty>
          ) : (
            <>
              <CartItems>
                {items.map((item) => (
                  <CartItemStyled key={item.id}>
                    <CartItemImage><img src={item.image} alt={item.name} /></CartItemImage>
                    <CartItemInfo>
                      <CartItemName>{item.name}</CartItemName>
                      <CartItemControls>
                        <QuantityLabel>Quantidade</QuantityLabel>
                        <QuantityControls>
                          <QuantityButton data-testid="quantity-btn-minus" onClick={() => removeItem(item.id)}>
                            <FontAwesomeIcon icon={faMinus} />
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton data-testid="quantity-btn-plus" onClick={() => addItem(item)}>
                            <FontAwesomeIcon icon={faPlus} />
                          </QuantityButton>
                        </QuantityControls>
                        <RemoveButton data-testid="remove-btn" title="Remover item" onClick={() => removeFromCart(item.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                      </CartItemControls>
                      <CartItemPrice>{(item.price * item.quantity).toFixed(2)}</CartItemPrice>
                    </CartItemInfo>
                  </CartItemStyled>
                ))}
              </CartItems>
              <CartTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalPrice>{totalPrice?.toFixed(2) ?? 0}</TotalPrice>
              </CartTotal>
              <FinalizeButton data-testid="finalize-btn">Finalizar compra</FinalizeButton>
            </>
          )}
        </CartModalContent>
      </CartModalContainer>
    </CartModalOverlay>
  );
};

const CartModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.cart.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(2px);
`;

const CartModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.cart.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.cart};
  color: ${({ theme }) => theme.colors.text.white};
`;

const CartModalHeader = styled.div`
  background: ${({ theme }) => theme.colors.primaryGradient};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

const CartModalCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CartModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-height: 60vh;
  overflow-y: auto;
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const CartItemStyled = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  background: ${({ theme }) => theme.colors.cart.item};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: white;
  line-height: 1.3;
`;

const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const QuantityLabel = styled.span`
  font-size: 0.9rem;
  color: #ccc;
  margin-right: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${({ theme }) => theme.colors.cart.controls};
  border-radius: 6px;
  padding: 5px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const QuantityDisplay = styled.span`
  background: ${({ theme }) => theme.colors.cart.display};
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.cart.remove};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-left: auto;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`;

const CartItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cart.price};
  margin-top: auto;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.cart.controls};
  margin-top: 20px;
`;

const TotalLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
`;

const TotalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cart.price};
`;

const FinalizeButton = styled.button`
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryGradientHover};
    transform: translateY(-1px);
    box-shadow: 0 5px 15px ${({ theme }) => theme.shadows.primary};
  }
`;

export default CartModal;
