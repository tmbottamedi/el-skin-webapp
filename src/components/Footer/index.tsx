import facebookIcon from "assets/facebook.png";
import githubIcon from "assets/github.png";
import instagramIcon from "assets/instagram.png";
import linkedinIcon from "assets/linkedin.png";
import twitterIcon from "assets/twitter.png";
import whatsappIcon from "assets/whatsapp.png";
import youtubeIcon from "assets/youtube.png";
import "./Footer.css";

const socialLinks = [
  { icon: facebookIcon, url: "https://www.facebook.com" },
  { icon: githubIcon, url: "https://github.com" },
  { icon: instagramIcon, url: "https://www.instagram.com" },
  { icon: linkedinIcon, url: "https://www.linkedin.com" },
  { icon: twitterIcon, url: "https://www.twitter.com" },
  { icon: youtubeIcon, url: "https://www.youtube.com" },
  { icon: whatsappIcon, url: "https://api.whatsapp.com" },
];

const footerColumns = [
  {
    title: "Sobre a AL SKIN",
    links: [
      { label: "quem somos", url: "/quemSomos" },
      { label: "time AL SKIN", url: "/time" },
      { label: "carreiras", url: "/carreiras" },
    ],
  },
  {
    title: "Loja AL SKIN",
    links: [
      { label: "lojas físicas", url: "/lojas" },
      { label: "devolução", url: "/devolucao" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "oi@alskin.com.br", url: "mailto:oi@alskin.com.br" },
      { label: "ajuda", url: "/ajuda" },
    ],
  },
  {
    title: "Blog AL SKIN",
    links: [
      { label: "Minha pele", url: "/blog/minha-pele" },
      { label: "Ingredientes", url: "/blog/ingredientes" },
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
            <img src={link.icon} alt="Social Icon" className="social-icon" />
          </a>
        ))}
      </div>
      <div className="footer-columns">
        {footerColumns.map((column) => (
          <div key={column.title} className="footer-column">
            <h3 className="column-title">{column.title}</h3>
            <ul className="column-links">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
