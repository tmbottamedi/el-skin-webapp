import { NextResponse } from "next/server";
import { API_CONFIG } from "config/APIConfig";

export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAROUSEL}`
    );
    if (!response.ok) {
      throw new Error("Falha ao buscar itens do carrossel no backend");
    }
    const carouselItems = await response.json();
    return NextResponse.json(carouselItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
