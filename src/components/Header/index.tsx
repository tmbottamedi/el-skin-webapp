import "./Header.css";
import searchIcon from "../../assets/search-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";

export default function Header() {
  return (
    <header className="App-header">
      <div className="header-top">
        <h2 className="header-logo">AL SKIN</h2>
        <div className="search-bar">
          <input type="text" placeholder="O que você está procurando?" />
          <img className="search-icon" src={searchIcon} alt="Search Icon" />
        </div>
        <div className="user-actions">
          <img src={cartIcon} alt="Cart Icon" />
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
