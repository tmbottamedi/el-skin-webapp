import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from "assets/carousel1.png";
import image2 from "assets/carousel2.png";
import image3 from "assets/carousel3.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./Carousel.css";

const slideData = [
  {
    image: image1,
    title: "anti-age",
    subtitle: "use o cupom ANTIAGE15 e ganhe 15% de desconto",
    callToAction: {
      text: "comprar agora",
      link: "/linha-corporal",
    },
  },
  {
    image: image2,
    title: "facial",
    subtitle: "para uma pele radiante e saudável",
    callToAction: {
      text: "descubra",
      link: "/linha-facial",
    },
  },
  {
    image: image3,
    title: "corporal",
    subtitle: "com benefícios além da hidratação",
    callToAction: {
      text: "comprar agora",
      link: "/linha-corporal",
    },
  },
];

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      className="carousel-container"
    >
      {slideData.map((slide) => (
        <SwiperSlide
          key={slide.image}
          className="carousel-slide"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <p>confira nossa linha</p>
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <a href={slide.callToAction.link} className="cta-button">
              {slide.callToAction.text} &rarr;
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
