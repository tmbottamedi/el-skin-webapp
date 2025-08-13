import Image from "next/image";
import styles from "./About.module.css";
import image1 from "assets/sobre1.png";
import image2 from "assets/sobre2.png";
import image3 from "assets/sobre3.png";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>Sobre a AL SKIN</h1>
      <section className={styles.aboutSectionOne}>
        <div className={styles.aboutTextContent}>
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
          <Image
            src={image2}
            alt="Frasco de produto com conta-gotas"
            className={styles.aboutDropperImage}
          />
        </div>
        <div className={styles.aboutImageContent}>
          <Image
            src={image1}
            alt="Mãos segurando um produto de skin care"
            className={styles.aboutMainImage}
          />
        </div>
      </section>
      <section className={styles.aboutCtaSection}>
        <h2>VAMOS CONVERSAR?</h2>
        <p>sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        <button className={styles.ctaButton}>seja um(a) revendedor(a)</button>
      </section>
      <section className={styles.aboutBannerSection}>
        <Image
          src={image3}
          alt="Mão segurando um frasco de skin care"
          className={styles.aboutBannerImage}
        />
      </section>
    </div>
  );
}
