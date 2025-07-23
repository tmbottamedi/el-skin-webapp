import { useState, useEffect, useCallback } from "react";
import { carouselService, ICarouselItem } from "service/carouselService";

export const useCarousel = () => {
  const [items, setItems] = useState<ICarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      const newItems = await carouselService.getCarouselItems();
      setItems(newItems);
    }

    fetchItems();
  }, []);

  const nextItem = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const previousItem = () => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => nextItem(), 3000);
    return () => clearInterval(timer);
  }, [items, nextItem]);

  return {
    items,
    currentItem: items[currentIndex],
    nextItem,
    previousItem,
  };
};
