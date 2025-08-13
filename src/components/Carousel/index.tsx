"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useGetCarouselItemsQuery } from "store/api/apiSlice";
import { useCallback, useEffect, useState } from "react";
import styles from "./Carousel.module.css";

function Carousel() {
  const { data: items = [], isLoading, error } = useGetCarouselItemsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousItem = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const nextItem = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  useEffect(() => {
    if (items.length > 0) {
      const timer = setInterval(nextItem, 3000);
      return () => clearInterval(timer);
    }
  }, [items.length, nextItem]);

  if (isLoading) return <h6>Carregando...</h6>;
  if (error) return <h6>Erro ao carregar carousel</h6>;
  if (items.length === 0) return <h6>Nenhum item encontrado</h6>;

  const currentItem = items[currentIndex];

  return (
    <section
      className={styles.carouselSection}
      style={{ backgroundImage: `url(${currentItem.backgroundImage})` }}
    >
      <div className={styles.carouselOverlay}></div>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselContent}>
          <button
            aria-label="Voltar"
            className={styles.carouselNavButton}
            onClick={previousItem}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{ color: "white", width: "24px", height: "24px" }}
            />
          </button>
          <div className={styles.carouselText}>
            <span className={styles.carouselSubtitle}>
              {currentItem.subtitle}
            </span>
            <h1 className={styles.carouselTitle}>{currentItem.title}</h1>
            <p className={styles.carouselDescription}>
              {currentItem.description}
            </p>
            <button className={styles.carouselCtaButton}>
              comprar agora
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
          <button
            aria-label="Próximo"
            className={styles.carouselNavButton}
            onClick={nextItem}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              style={{ color: "white", width: "24px", height: "24px" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
