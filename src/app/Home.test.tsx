/* eslint-disable react/display-name */
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { render } from "utils/test-utils";

// Os mocks dos componentes filhos continuam a ser uma boa prática.
jest.mock("components/Carousel", () => () => <div>Carousel Component</div>);
jest.mock("components/ProductShowcase", () => () => (
  <div>ProductShowcase Component</div>
));

describe("Home Page", () => {
  it("deve renderizar os componentes Carousel e ProductShowcase", () => {
    render(<Home />);
    expect(screen.getByText("Carousel Component")).toBeInTheDocument();
    expect(screen.getByText("ProductShowcase Component")).toBeInTheDocument();
  });
});
