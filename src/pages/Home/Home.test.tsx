/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from ".";

// Mock dos componentes filhos para isolar o teste da página Home
jest.mock("components/Carousel", () => () => <div>Carousel Component</div>);
jest.mock("components/ProductShowcase", () => () => (
  <div>ProductShowcase Component</div>
));

describe("Home Page", () => {
  it("deve renderizar os componentes Carousel e ProductShowcase", () => {
    // Act
    render(<Home />);

    // Assert
    // Verifica se o texto dos componentes mockados está presente no documento
    expect(screen.getByText("Carousel Component")).toBeInTheDocument();
    expect(screen.getByText("ProductShowcase Component")).toBeInTheDocument();
  });
});
