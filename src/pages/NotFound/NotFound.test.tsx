/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from ".";
import { BrowserRouter as Router } from "react-router-dom";

describe("NotFound", () => {
  it("deve renderizar os componentes Carousel e ProductShowcase", () => {
    // Act
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Assert
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });
});
