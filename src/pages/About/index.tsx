import "./About.css";

import image1 from "assets/sobre1.png";
import image2 from "assets/sobre2.png";
import image3 from "assets/sobre3.png";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">Sobre a AL SKIN</h1>

      <section className="about-section-one">
        <div className="about-text-content">
          <article>
            <h2>QUEM SOMOS</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </article>
          <article>
            <h2>POR QUE EXISTIMOS?</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt.
            </p>
          </article>
          <article>
            <h2>O QUE A GENTE FAZ?</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est.
            </p>
          </article>
          <img
            src={image2}
            alt="Frasco de produto com conta-gotas"
            className="about-dropper-image"
          />
        </div>
        <div className="about-image-content">
          <img
            src={image1}
            alt="Mãos segurando um produto de skin care"
            className="about-main-image"
          />
        </div>
      </section>

      <section className="about-cta-section">
        <h2>VAMOS CONVERSAR?</h2>
        <p>sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        <button className="cta-button">seja um(a) revendedor(a)</button>
      </section>

      <section className="about-banner-section">
        <img
          src={image3}
          alt="Mão segurando um frasco de skin care"
          className="about-banner-image"
        />
      </section>
    </div>
  );
}
