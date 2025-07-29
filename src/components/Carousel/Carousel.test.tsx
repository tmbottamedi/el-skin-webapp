import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carousel from ".";
import { useCarousel } from "hooks/useCarousel";
import { ICarouselItem } from "service/carouselService";

jest.mock("hooks/useCarousel");
const mockedUseCarousel = useCarousel as jest.Mock;

describe("Carousel Component", () => {
  const mockPreviousItem = jest.fn();
  const mockNextItem = jest.fn();

  // eslint-disable-next-line quotes
  it('deve exibir a mensagem "Carregando..." quando não há item atual', () => {
    // Arrange: Simula o estado inicial de carregamento
    mockedUseCarousel.mockReturnValue({
      currentItem: null,
      previousItem: mockPreviousItem,
      nextItem: mockNextItem,
    });

    // Act
    render(<Carousel />);

    // Assert
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve renderizar o conteúdo do carrossel quando há um item atual", () => {
    // Arrange: Simula um item de carrossel válido
    const currentItem: ICarouselItem = {
      title: "Título do Teste",
      subtitle: "Subtítulo do Teste",
      description: "Descrição do Teste",
      backgroundImage: "test.jpg",
    };
    mockedUseCarousel.mockReturnValue({
      currentItem: currentItem,
      previousItem: mockPreviousItem,
      nextItem: mockNextItem,
    });

    // Act
    render(<Carousel />);

    // Assert
    expect(screen.getByText("Título do Teste")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo do Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Teste")).toBeInTheDocument();
  });

  it("deve chamar a função nextItem ao clicar no botão de próximo", () => {
    const currentItem: ICarouselItem = {
      title: "Teste",
      subtitle: "Sub",
      description: "Desc",
      backgroundImage: "bg.jpg",
    };
    mockedUseCarousel.mockReturnValue({
      currentItem: currentItem,
      previousItem: mockPreviousItem,
      nextItem: mockNextItem,
    });

    render(<Carousel />);

    const nextButton = screen.getByRole("button", { name: /Próximo/i });
    fireEvent.click(nextButton);

    expect(mockNextItem).toHaveBeenCalledTimes(1);
  });

  it("deve chamar a função previousItem ao clicar no botão de voltar", () => {
    const currentItem: ICarouselItem = {
      title: "Teste",
      subtitle: "Sub",
      description: "Desc",
      backgroundImage: "bg.jpg",
    };
    mockedUseCarousel.mockReturnValue({
      currentItem: currentItem,
      previousItem: mockPreviousItem,
      nextItem: mockNextItem,
    });

    render(<Carousel />);

    const backButton = screen.getByRole("button", { name: /Voltar/i });
    fireEvent.click(backButton);

    expect(mockPreviousItem).toHaveBeenCalledTimes(1);
  });
});
