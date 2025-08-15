import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "./not-found";
import { render } from "utils/test-utils";

const mockRouterBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      back: mockRouterBack,
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));

describe("NotFound Page", () => {
  beforeEach(() => {
    mockRouterBack.mockClear();
  });

  it("deve renderizar a mensagem de página não encontrada", () => {
    render(<NotFound />);
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("deve chamar a função router.back ao clicar no botão de voltar", () => {
    render(<NotFound />);
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });
});
