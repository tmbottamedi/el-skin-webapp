/* eslint-disable quotes */
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartModal from ".";  
import { CartItem } from "hooks/useCart";
import { render } from "utils/test-utils";

let mockAddItem = jest.fn();
let mockRemoveItem = jest.fn();
let mockRemoveFromCart = jest.fn();
let mockTotalPrice = 0;

jest.mock("context/CartContext", () => {
  return {
    __esModule: true,
    useCartContext: () => ({
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      removeFromCart: mockRemoveFromCart,
      totalPrice: mockTotalPrice,
    }),
    CartProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const mockItems: CartItem[] = [
  {
    id: "1",
    name: "Sérum Facial",
    price: 120.5,
    quantity: 2,
    image: "serum.jpg",
  },
  {
    id: "2",
    name: "Protetor Solar",
    price: 80,
    quantity: 1,
    image: "protetor.jpg",
  },
];

describe("CartModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockAddItem = jest.fn();
    mockRemoveItem = jest.fn();
    mockRemoveFromCart = jest.fn();
    mockTotalPrice = 321.0;
  });

  it("não deve renderizar nada se isOpen for falso", () => {
    render(<CartModal isOpen={false} onClose={mockOnClose} items={[]} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("deve exibir a mensagem de carrinho vazio", () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} items={[]} />);
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("deve renderizar os itens do carrinho corretamente", () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />);

    expect(screen.getByText("Sérum Facial")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("241.00")).toBeInTheDocument();

    expect(screen.getByText("Protetor Solar")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("80.00")).toBeInTheDocument();

    expect(screen.getByText("321.00")).toBeInTheDocument();
  });

  describe("Ações do Usuário", () => {
    it("deve chamar onClose ao clicar no botão de fechar", () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const closeButton = screen.getByTestId("cart-modal-close");
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("deve chamar onClose ao clicar no overlay (fundo)", () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const overlay = screen.getByRole("dialog");
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao pressionar a tecla "Escape"', () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const overlay = screen.getByRole("dialog");
      fireEvent.keyDown(overlay, { key: "Escape", code: "Escape" });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar addItem ao clicar no botão "+"', () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const plusButtons = screen.getAllByTestId("quantity-btn-plus");
      fireEvent.click(plusButtons[0]); // Clica no '+' do primeiro item
      expect(mockAddItem).toHaveBeenCalledTimes(1);
      expect(mockAddItem).toHaveBeenCalledWith(mockItems[0]);
    });

    it('deve chamar removeItem ao clicar no botão "-"', () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const minusButtons = screen.getAllByTestId("quantity-btn-minus");
      fireEvent.click(minusButtons[0]); // Clica no '-' do primeiro item
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      expect(mockRemoveItem).toHaveBeenCalledWith(mockItems[0].id);
    });

    it("deve chamar removeFromCart ao clicar no ícone da lixeira", () => {
      render(
        <CartModal isOpen={true} onClose={mockOnClose} items={mockItems} />
      );
      const trashButtons = screen.getAllByTestId("remove-btn");
      fireEvent.click(trashButtons[0]); // Clica na lixeira do primeiro item
      expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
      expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItems[0].id);
    });
  });
});
