import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { CartProvider } from "context/CartContext";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter as Router } from "react-router-dom";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Router>{children}</Router>
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Sobrescreve o método render original
export { customRender as render };
