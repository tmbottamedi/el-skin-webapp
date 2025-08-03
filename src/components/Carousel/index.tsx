import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useCarousel } from "hooks/useCarousel";
import styled, { keyframes } from "styled-components";

function Carousel() {
  const { currentItem, previousItem, nextItem } = useCarousel();

  if (!currentItem) {
    return <h6>Carregando...</h6>;
  }

  return (
    <CarouselSection $backgroundImage={currentItem.backgroundImage}>
      <CarouselContainer>
        <CarouselContent>
          <CarouselNavButton aria-label="Voltar" onClick={previousItem}>
            <FontAwesomeIcon width="60" height="24" icon={faAngleLeft} style={{ color: "white" }} />
          </CarouselNavButton>

          <CarouselText>
            <CarouselSubtitle>{currentItem.subtitle}</CarouselSubtitle>
            <CarouselTitle>{currentItem.title}</CarouselTitle>
            <CarouselDescription>{currentItem.description}</CarouselDescription>
            <CarouselCtaButton>
              comprar agora
              <FontAwesomeIcon icon={faAngleRight} />
            </CarouselCtaButton>
          </CarouselText>

          <CarouselNavButton aria-label="Próximo" onClick={nextItem}>
            <FontAwesomeIcon width="60" height="24" icon={faAngleRight} style={{ color: "white" }} />
          </CarouselNavButton>
        </CarouselContent>
      </CarouselContainer>
    </CarouselSection>
  );
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CarouselSection = styled.section<{ $backgroundImage: string }>`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 40%,
      transparent 60%
    ),
    ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const CarouselContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 1000px;
`;

const CarouselNavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }
`;

const CarouselText = styled.div`
  flex: 1;

  > * {
    animation: ${fadeInUp} 0.6s ease-out forwards;
  }
`;

const CarouselSubtitle = styled.span`
  display: block;
  font-size: 16px;
  color: #8b4a8b;
  margin-bottom: 8px;
  font-weight: 400;
  letter-spacing: 0.5px;
  animation-delay: 0.1s;
`;

const CarouselTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: #8b4a8b;
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(139, 74, 139, 0.1);
  animation-delay: 0.2s;
`;

const CarouselDescription = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
  max-width: 400px;
  animation-delay: 0.3s;
`;

const CarouselCtaButton = styled.button`
  background: linear-gradient(135deg, #8b4a8b 0%, #a855a8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(139, 74, 139, 0.3);
  text-transform: lowercase;
  animation-delay: 0.4s;

  &:hover {
    background: linear-gradient(135deg, #7a3e7a 0%, #9333ea 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 74, 139, 0.4);
  }
`;

export default Carousel;
