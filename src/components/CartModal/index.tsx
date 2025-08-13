"use client";
import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCart } from "hooks/useCart";
import styles from "./CartModal.module.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    items,
    handleAddItem,
    handleRemoveItem,
    totalPrice,
    handleRemoveFromCart,
  } = useCart();

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
    <div
      className={styles.cartModalOverlay}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className={styles.cartModalContainer}>
        <div className={styles.cartModalHeader}>
          <h2 id="cart-modal-title">Carrinho</h2>
          <button
            data-testid="cart-modal-close"
            className={styles.cartModalCloseButton}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.cartModalContent}>
          {items.length === 0 ? (
            <div className={styles.cartEmpty}>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cartItemStyled}>
                    <div className={styles.cartItemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.cartItemInfo}>
                      <h3 className={styles.cartItemName}>{item.name}</h3>
                      <div className={styles.cartItemControls}>
                        <span className={styles.quantityLabel}>Quantidade</span>
                        <div className={styles.quantityControls}>
                          <button
                            data-testid="quantity-btn-minus"
                            className={styles.quantityButton}
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className={styles.quantityDisplay}>
                            {item.quantity}
                          </span>
                          <button
                            data-testid="quantity-btn-plus"
                            className={styles.quantityButton}
                            onClick={() => handleAddItem(item)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        <button
                          data-testid="remove-btn"
                          title="Remover item"
                          className={styles.removeButton}
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <div className={styles.cartItemPrice}>
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cartTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalPrice}>
                  {totalPrice?.toFixed(2) ?? 0}
                </span>
              </div>
              <button
                data-testid="finalize-btn"
                className={styles.finalizeButton}
              >
                Finalizar compra
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
