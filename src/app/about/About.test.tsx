import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "./page";
import { render } from "utils/test-utils";

test("tela About deve ser renderizada", () => {
  render(<About />);
  expect(screen.getByText("Sobre a AL SKIN")).toBeInTheDocument();
});
