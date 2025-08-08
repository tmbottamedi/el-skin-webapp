import { Provider } from "react-redux";
import { store } from "store";
import { ThemeProvider } from "styled-components";
import AppRouter from "./routes";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
