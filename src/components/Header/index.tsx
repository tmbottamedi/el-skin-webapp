import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CartModal from "components/CartModal";
import { useSearch } from "hooks/useSearch";
import { useCart } from "hooks/useCart";
import styles from "./Header.module.css";

export default function Header() {
  const { term, setTerm } = useSearch();
  const { isCartOpen, handleCartToggle, quantity } = useCart();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${term}`);
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <h2 className={styles.headerLogo}>AL SKIN</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="O que você está procurando?"
            onChange={handleOnChange}
          />
          <button
            className={styles.searchButton}
            data-testid="search-button"
            onClick={onClickSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className={styles.userActions}>
          <button
            className={styles.shopButton}
            data-testid="shop-button"
            onClick={handleCartToggle}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {quantity > 0 && <span>{quantity}</span>}
          </button>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="/">Categorias</a>
            </li>
            <li>
              <a href="/types">Tipo de pele</a>
            </li>
            <li>
              <a href="/needs">Necessidade</a>
            </li>
            <li>
              <a href="/ingredients">Ingredientes</a>
            </li>
          </ul>
        </nav>
        <div className={styles.promotionBanner}>
          <a href="/kits-promocao">Kits até 50% OFF</a>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} />
    </header>
  );
}
