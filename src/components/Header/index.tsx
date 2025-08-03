import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSearchContext } from "context/SearchContext";
import CartModal from "components/CartModal";
import { useCartContext } from "context/CartContext";
import styled from "styled-components";

export default function Header() {
  const { search, setSearch } = useSearchContext();
  const { items, isCartOpen, handleCartToggle, quantity } = useCartContext();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
  }

  return (
    <HeaderContainer>
      <HeaderTop>
        <HeaderLogo>AL SKIN</HeaderLogo>
        <SearchBar>
          <input
            type="text"
            placeholder="O que você está procurando?"
            onChange={handleOnChange}
          />
          <SearchButton data-testid="search-button" onClick={onClickSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </SearchButton>
        </SearchBar>
        <UserActions>
          <ShopButton data-testid="shop-button" onClick={handleCartToggle}>
            <FontAwesomeIcon icon={faCartShopping} />
            {quantity > 0 && <span>{quantity}</span>}
          </ShopButton>
        </UserActions>
      </HeaderTop>
      <HeaderBottom>
        <nav>
          <NavLinks>
            <li><a href="/">Categorias</a></li>
            <li><a href="/types">Tipo de pele</a></li>
            <li><a href="/needs">Necessidade</a></li>
            <li><a href="/ingredients">Ingredientes</a></li>
          </NavLinks>
        </nav>
        <PromotionBanner>
          <a href="/kits-promocao">Kits até 50% OFF</a>
        </PromotionBanner>
      </HeaderBottom>
      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} items={items} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 95%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderLogo = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  flex-basis: 150px;
`;

const SearchBar = styled.div`
  flex-grow: 1;
  position: relative;
  max-width: 750px;
  margin: 0 20px;

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: ${({ theme }) => theme.borderRadius.pill};
    background-color: #f5f5f5;
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #888;
`;

const UserActions = styled.div`
  cursor: pointer;
  flex-basis: 150px;
  display: flex;
  justify-content: flex-end;
`;

const ShopButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;

  span {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: ${({ theme }) => theme.colors.promo};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.round};
    padding: 2px 6px;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 30px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
    padding: 5px 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #000;
      font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
  }
`;

const PromotionBanner = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.promo};
    font-weight: bold;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;