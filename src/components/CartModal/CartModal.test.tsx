import { render } from "utils/test-utils";
import "@testing-library/jest-dom";
import CartModal from ".";
import * as CartHook from "hooks/useCart";
import { CartItem } from "store/slices/cartSlice";
import { screen, fireEvent } from "@testing-library/dom";

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

const mockUseCart = jest.spyOn(CartHook, "useCart");

describe("CartModal Component", () => {
  const mockOnClose = jest.fn();
  const mockHandleAddItem = jest.fn();
  const mockHandleRemoveItem = jest.fn();
  const mockHandleRemoveFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("não deve renderizar se isOpen for falso", () => {
    // CORREÇÃO: Mock do hook para evitar o erro, pois ele é chamado antes do `return null`.
    mockUseCart.mockReturnValue({
      items: [],
      totalPrice: 0,
      quantity: 0,
      handleAddItem: mockHandleAddItem,
      handleRemoveItem: mockHandleRemoveItem,
      handleRemoveFromCart: mockHandleRemoveFromCart,
      isCartOpen: false,
      handleCartToggle: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("deve mostrar mensagem de carrinho vazio", () => {
    mockUseCart.mockReturnValue({
      items: [],
      totalPrice: 0,
      quantity: 0,
      handleAddItem: mockHandleAddItem,
      handleRemoveItem: mockHandleRemoveItem,
      handleRemoveFromCart: mockHandleRemoveFromCart,
      isCartOpen: true,
      handleCartToggle: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("deve renderizar itens do carrinho e interagir com eles", () => {
    mockUseCart.mockReturnValue({
      items: mockItems,
      totalPrice: 321.0, // (120.5 * 2) + 80
      quantity: 3,
      handleAddItem: mockHandleAddItem,
      handleRemoveItem: mockHandleRemoveItem,
      handleRemoveFromCart: mockHandleRemoveFromCart,
      isCartOpen: true,
      handleCartToggle: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Sérum Facial")).toBeInTheDocument();
    expect(screen.getByText("Protetor Solar")).toBeInTheDocument();
    expect(screen.getByText("321.00")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("cart-modal-close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // CORREÇÃO: Usar `getAllByTestId` para lidar com múltiplos elementos.
    const plusButtons = screen.getAllByTestId("quantity-btn-plus");
    fireEvent.click(plusButtons[0]); // Interage com o primeiro botão "+"
    expect(mockHandleAddItem).toHaveBeenCalledWith(mockItems[0]);

    const minusButtons = screen.getAllByTestId("quantity-btn-minus");
    fireEvent.click(minusButtons[0]); // Interage com o primeiro botão "-"
    expect(mockHandleRemoveItem).toHaveBeenCalledWith("1");

    const removeButtons = screen.getAllByTestId("remove-btn");
    fireEvent.click(removeButtons[0]); // Interage com a primeira lixeira
    expect(mockHandleRemoveFromCart).toHaveBeenCalledWith("1");
  });
});
