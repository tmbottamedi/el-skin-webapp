import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { useCarousel } from "hooks/useCarousel";

function Carousel() {
  const { currentItem, previousItem, nextItem } = useCarousel();

  return (
    <>
      {!currentItem && <h6>Carregando...</h6>}
      {currentItem && (
        <section
          className="carouselSection"
          style={{
            backgroundImage: `url(${currentItem.backgroundImage})`,
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
                <span className="carouselSubtitle">{currentItem.subtitle}</span>
                <h1 className="carouselTitle">{currentItem.title}</h1>
                <p className="carouselDescription">{currentItem.description}</p>
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
