import AppRouter from "routes";
import { SearchProvider } from "context/SearchContext";
import { CartProvider } from "context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
    </CartProvider>
  );
}
