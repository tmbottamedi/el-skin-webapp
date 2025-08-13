import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faYoutube,
  faPinterest,
  faTwitter,
  faLinkedinIn,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";
import Link from "next/link";

const socialLinks = [
  { icon: faInstagram, url: "https://www.instagram.com", label: "Instagram" },
  { icon: faFacebookF, url: "https://www.facebook.com", label: "Facebook" },
  { icon: faYoutube, url: "https://www.youtube.com", label: "Youtube" },
  { icon: faPinterest, url: "https://www.pinterest.com", label: "Pinterest" },
  { icon: faTwitter, url: "https://www.twitter.com", label: "Twitter" },
  { icon: faLinkedinIn, url: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: faSpotify, url: "https://www.spotify.com", label: "Spotify" },
];

const footerColumns = [
  {
    title: "Sobre a AL SKIN",
    url: "/about",
    links: [
      { label: "- quem somos", url: "/quemSomos" },
      { label: "- time AL SKIN", url: "/time" },
      { label: "- carreiras", url: "/carreiras" },
    ],
  },
  {
    title: "Loja AL SKIN",
    url: "/loja",
    links: [
      { label: "- lojas físicas", url: "/lojas" },
      { label: "- devolução", url: "/devolucao" },
    ],
  },
  {
    title: "Atendimento",
    url: "/atendimento",
    links: [
      { label: "- oi@alskin.com.br", url: "mailto:oi@alskin.com.br" },
      { label: "- ajuda", url: "/ajuda" },
    ],
  },
  {
    title: "Blog AL SKIN",
    url: "/blog",
    links: [
      { label: "- Minha pele", url: "/blog/minha-pele" },
      { label: "- Ingredientes", url: "/blog/ingredientes" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.socialSection}>
        {socialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visite nosso ${link.label}`}
            className={styles.socialIconLink}
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
      <div className={styles.footerColumns}>
        {footerColumns.map((column) => (
          <div key={column.title} className={styles.footerColumn}>
            <a href={column.url}>{column.title}</a>
            <ul className={styles.columnLinks}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.url} className={styles.columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
