import "./Header.css";
import searchIcon from "assets/search-icon.svg";
import shopIcon from "assets/shop-icon.svg";

export default function Header() {
  return (
    <header className="App-header">
      <div className="header-top">
        <h2 className="header-logo">AL SKIN</h2>
        <div className="search-bar">
          <input type="text" placeholder="O que você está procurando?" />
          <button className="search-button">
            <img className="search-icon" src={searchIcon} alt="Search Icon" />
          </button>
        </div>
        <div className="user-actions">
          <button className="shop-button">
            <img src={shopIcon} alt="Shop Icon" />
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
