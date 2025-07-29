import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "./useCarousel";
import { carouselService, ICarouselItem } from "service/carouselService";

// Mock the service
jest.mock("service/carouselService");
const mockedCarouselService = carouselService as jest.Mocked<
  typeof carouselService
>;

const mockItems: ICarouselItem[] = [
  {
    title: "Item 1",
    description: "Desc 1",
    subtitle: "Sub 1",
    backgroundImage: "bg1.jpg",
  },
  {
    title: "Item 2",
    description: "Desc 2",
    subtitle: "Sub 2",
    backgroundImage: "bg2.jpg",
  },
];

describe("useCarousel Hook", () => {
  beforeEach(() => {
    mockedCarouselService.getCarouselItems.mockResolvedValue(mockItems);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("deve buscar os itens e definir o primeiro como atual", async () => {
    const { result } = renderHook(() => useCarousel());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.currentItem).toEqual(mockItems[0]);
    expect(carouselService.getCarouselItems).toHaveBeenCalledTimes(1);
  });

  it("deve avançar para o próximo item", async () => {
    const { result } = renderHook(() => useCarousel());
    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.nextItem();
    });

    expect(result.current.currentItem).toEqual(mockItems[1]);
  });

  it("deve voltar para o item anterior", async () => {
    const { result } = renderHook(() => useCarousel());
    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.nextItem();
    });
    act(() => {
      result.current.previousItem();
    });

    expect(result.current.currentItem).toEqual(mockItems[0]);
  });

  it("deve avançar para o próximo item automaticamente com o timer", async () => {
    const { result } = renderHook(() => useCarousel());
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.currentItem).toEqual(mockItems[0]);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.currentItem).toEqual(mockItems[1]);
  });
});
