import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function Header() {
  const [textoBusca, setTextoBusca] = useState("valor inicial do texto");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextoBusca(e.target.value);
  }

  function onClickSearch() {
    alert(`Você pesquisou por: ${textoBusca}`);
  }

  return (
    <header className="App-header">
      <div className="header-top">
        <h2 className="header-logo">AL SKIN</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="O que você está procurando?"
            onChange={handleOnChange}
          />
          <button className="search-button" onClick={onClickSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="user-actions">
          <button className="shop-button">
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
      <div className="header-bottom">
        <nav>
          <ul className="nav-links">
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
        <div className="promotion-banner">
          <a href="/kits-promocao">Kits até 50% OFF</a>
        </div>
      </div>
    </header>
  );
}
