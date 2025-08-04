import styled from "styled-components";

import image1 from "assets/sobre1.png";
import image2 from "assets/sobre2.png";
import image3 from "assets/sobre3.png";

export default function About() {
  return (
    <AboutContainer>
      <AboutTitle>Sobre a AL SKIN</AboutTitle>
      <AboutSectionOne>
        <AboutTextContent>
          <article>
            <h2>QUEM SOMOS</h2>
            <p>Lorem ipsum dolor sit amet...</p>
          </article>
          <article>
            <h2>POR QUE EXISTIMOS?</h2>
            <p>Duis aute irure dolor in reprehenderit...</p>
          </article>
          <article>
            <h2>O QUE A GENTE FAZ?</h2>
            <p>Nemo enim ipsam voluptatem quia volupta..</p>
          </article>
          <AboutDropperImage
            src={image2}
            alt="Frasco de produto com conta-gotas"
          />
        </AboutTextContent>
        <AboutImageContent>
          <AboutMainImage
            src={image1}
            alt="Mãos segurando um produto de skin care"
          />
        </AboutImageContent>
      </AboutSectionOne>
      <AboutCtaSection>
        <h2>VAMOS CONVERSAR?</h2>
        <p>sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        <CtaButton>seja um(a) revendedor(a)</CtaButton>
      </AboutCtaSection>
      <AboutBannerSection>
        <AboutBannerImage
          src={image3}
          alt="Mão segurando um frasco de skin care"
        />
      </AboutBannerSection>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: sans-serif;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AboutTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const AboutSectionOne = styled.section`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
`;

const AboutTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  article {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #555;
  }
`;

const AboutDropperImage = styled.img`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

const AboutImageContent = styled.div`
  flex: 1;
`;

export const AboutMainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutCtaSection = styled.section`
  text-align: center;
  padding: 60px 20px;
  background-color: #f9f9f9;
  margin: 0 -20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #777;
    margin-bottom: 30px;
  }
`;

const CtaButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const AboutBannerSection = styled.section`
  margin-top: 60px;
`;

const AboutBannerImage = styled.img`
  width: 100%;
  height: auto;
`;
