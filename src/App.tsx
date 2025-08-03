import { ThemeProvider } from 'styled-components';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import AppRouter from './routes';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <SearchProvider>
          <AppRouter />
        </SearchProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;