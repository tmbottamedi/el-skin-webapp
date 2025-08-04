import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { CartProvider } from "context/CartContext";
import { SearchProvider } from "context/SearchContext";
import { BrowserRouter as Router } from "react-router-dom";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <SearchProvider>
          <Router>{children}</Router>
        </SearchProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Sobrescreve o método render original
export { customRender as render };
