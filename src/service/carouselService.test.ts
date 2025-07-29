import { carouselService, ICarouselItem } from "./carouselService";
import api from "./api";
import { API_CONFIG } from "config/APIConfig";

jest.mock("./api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("carouselService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar e retornar os itens do carrossel com sucesso", async () => {
    const mockCarouselItems: ICarouselItem[] = [
      {
        subtitle: "Novidade",
        title: "Linha Hidratação Profunda",
        description: "Pele macia e radiante o dia todo.",
        backgroundImage: "background.jpg",
      },
    ];

    mockedApi.get.mockResolvedValue({ data: mockCarouselItems });

    const items = await carouselService.getCarouselItems();

    expect(items).toEqual(mockCarouselItems);
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Linha Hidratação Profunda");

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.CAROUSEL);
  });

  it("deve propagar um erro se a chamada da API falhar", async () => {
    const errorMessage = "Network Error";
    mockedApi.get.mockRejectedValue(new Error(errorMessage));

    await expect(carouselService.getCarouselItems()).rejects.toThrow(
      errorMessage
    );
  });
});
