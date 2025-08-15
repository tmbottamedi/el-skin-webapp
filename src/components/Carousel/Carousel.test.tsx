import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SWRConfig } from "swr";
import Carousel from ".";
import { ICarouselItem } from "types/Carousel";

// Dados de teste
const mockCarouselItems: ICarouselItem[] = [
  {
    subtitle: "Novidade",
    title: "Item 1",
    description: "Descrição do item 1",
    backgroundImage: "bg1.jpg",
  },
  {
    subtitle: "Promoção",
    title: "Item 2",
    description: "Descrição do item 2",
    backgroundImage: "bg2.jpg",
  },
];

// Utilitário de renderização para SWR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithSWR = (ui: React.ReactElement, providerProps: any) => {
  return render(<SWRConfig value={{ ...providerProps }}>{ui}</SWRConfig>);
};

describe("Carousel Component", () => {
  it("deve renderizar o primeiro item do carrossel quando os dados são carregados", async () => {
    // Fornecemos os dados através do 'fallback' do SWR
    renderWithSWR(<Carousel />, {
      fallback: {
        "/api/carousel": mockCarouselItems,
      },
    });

    // Espera que o item 1 apareça no ecrã
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Descrição do item 1")).toBeInTheDocument();
    });
  });

  it("deve navegar para o próximo item ao clicar no botão 'Próximo'", async () => {
    renderWithSWR(<Carousel />, {
      fallback: {
        "/api/carousel": mockCarouselItems,
      },
    });

    // Garante que o primeiro item está visível
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /Próximo/i });
    fireEvent.click(nextButton);

    // Agora, o segundo item deve estar visível
    await waitFor(() => {
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });
  });
});
