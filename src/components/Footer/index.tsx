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
import "./Footer.css";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: faInstagram, url: "https://www.instagram.com" },
  { icon: faFacebookF, url: "https://www.facebook.com" },
  { icon: faYoutube, url: "https://www.youtube.com" },
  { icon: faPinterest, url: "https://www.pinterest.com" },
  { icon: faTwitter, url: "https://www.twitter.com" },
  { icon: faLinkedinIn, url: "https://www.linkedin.com" },
  { icon: faSpotify, url: "https://www.spotify.com" },
];

const footerColumns = [
  {
    title: "Sobre a AL SKIN",
    url: "/sobre",
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
    <footer className="App-footer">
      <div className="social-section">
        {socialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={link.icon} color="#000" fontSize={30} />
          </a>
        ))}
      </div>
      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column.title} className="footer-column">
            <a href={column.url}>{column.title}</a>
            <ul className="column-links">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link className="footer-link" to={link.url} key={link.label}>
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
