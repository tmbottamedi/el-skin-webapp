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
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <FooterContainer>
      <SocialSection>
        {socialLinks.map((link) => (
          <SocialIconLink
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visite nosso ${link.label}`}
          >
            <FontAwesomeIcon icon={link.icon} />
          </SocialIconLink>
        ))}
      </SocialSection>
      <FooterColumns>
        {footerColumns.map((column) => (
          <FooterColumn key={column.title}>
            <a href={column.url}>{column.title}</a>
            <ColumnLinks>
              {column.links.map((link) => (
                <li key={link.label}>
                  <ColumnLink to={link.url}>{link.label}</ColumnLink>
                </li>
              ))}
            </ColumnLinks>
          </FooterColumn>
        ))}
      </FooterColumns>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: sans-serif;
`;

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
`;

const SocialIconLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #888;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #555;
    transform: scale(1.1);
  }
`;

const FooterColumns = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 180px;

  > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
    margin-bottom: 15px;
    display: block;
  }
`;

const ColumnLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
  }
`;

const ColumnLink = styled(Link)`
  text-decoration: none;
  font-weight: normal;
  margin: 0;
  color: #555;

  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;
