import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img1 from "assets/carousel1.png";
import Img2 from "assets/carousel2.png";
import Img3 from "assets/carousel3.png";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { useEffect, useState } from "react";

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {
  const items: ICarouselItem[] = [
    {
      subtitle: "confira nossa linha",
      title: "corporal",
      description: "com benefícios além da hidratação",
      backgroundImage: Img1,
    },
    {
      subtitle: "toda linha",
      title: "anti-age",
      description: "use o cupom ANTIAGE15",
      backgroundImage: Img2,
    },
    {
      subtitle: "",
      title: "kits incríveis",
      description: "até 50% OFF",
      backgroundImage: Img3,
    },
  ];

  const [idxItemAtual, setIdxItemAtual] = useState(0);

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

  useEffect(() => {
    console.log("criou o interval....");
    const timer = setInterval(() => {
      console.log("ciclou o elemento....");
      setIdxItemAtual((prevIdxItemAtual) => {
        return (prevIdxItemAtual + 1) % items.length;
      });
    }, 3000);

    return () => {
      console.log("limpou o interval....");
      clearInterval(timer);
    };
  }, [items.length]);

  return (
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
  );
}

export default Carousel;
