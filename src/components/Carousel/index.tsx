import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { useEffect, useState } from "react";
import { carouselService } from "service/carouselService";

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {
  const [items, setItems] = useState<ICarouselItem[]>([]);

  const [idxItemAtual, setIdxItemAtual] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      const newItems = await carouselService.getCarouselItems();
      setItems(newItems);
    }

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => nextItem(), 3000);
    return () => clearInterval(timer);
  }, [items]);

  function previousItem() {
    setIdxItemAtual((prevIdx) =>
      prevIdx === 0 ? items.length - 1 : prevIdx - 1
    );
  }

  function nextItem() {
    setIdxItemAtual((prevIdx) =>
      prevIdx === items.length - 1 ? 0 : prevIdx + 1
    );
  }

  return (
    <>
      {items.length === 0 && <h6>Carregando...</h6>}
      {items.length > 0 && (
        <section
          className="carouselSection"
          style={{
            backgroundImage: `url(${items[idxItemAtual].backgroundImage})`,
          }}
        >
          <div className="carouselContainer">
            <div className="carouselContent">
              <button
                className="carouselNavButton"
                aria-label="Voltar"
                onClick={previousItem}
              >
                <FontAwesomeIcon
                  width="60"
                  height="24"
                  icon={faAngleLeft}
                  style={{ color: "white" }}
                />
              </button>

              <div className="carouselText">
                <span className="carouselSubtitle">
                  {items[idxItemAtual].subtitle}
                </span>
                <h1 className="carouselTitle">{items[idxItemAtual].title}</h1>
                <p className="carouselDescription">
                  {items[idxItemAtual].description}
                </p>
                <button className="carouselCtaButton">
                  comprar agora
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>

              <button
                className="carouselNavButton"
                aria-label="Próximo"
                onClick={nextItem}
              >
                <FontAwesomeIcon
                  width="60"
                  height="24"
                  icon={faAngleRight}
                  style={{ color: "white" }}
                />
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Carousel;
