/* eslint-disable react/display-name */
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from ".";
import { render } from "utils/test-utils";

describe("NotFound", () => {
  it("deve renderizar os componentes Carousel e ProductShowcase", () => {
    // Act
    render(<NotFound />);

    // Assert
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });
});
