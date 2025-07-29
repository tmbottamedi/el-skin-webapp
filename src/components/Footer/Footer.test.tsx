import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from ".";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer Component", () => {
  const renderFooter = () => {
    return render(
      <Router>
        <Footer />
      </Router>
    );
  };

  it("deve renderizar os títulos das colunas", () => {
    renderFooter();
    expect(screen.getByText("Sobre a AL SKIN")).toBeInTheDocument();
    expect(screen.getByText("Loja AL SKIN")).toBeInTheDocument();
    expect(screen.getByText("Atendimento")).toBeInTheDocument();
    expect(screen.getByText("Blog AL SKIN")).toBeInTheDocument();
  });

  it("deve renderizar os links de navegação interna corretamente", () => {
    renderFooter();
    const quemSomosLink = screen.getByRole("link", { name: /- quem somos/i });
    expect(quemSomosLink).toBeInTheDocument();
    expect(quemSomosLink).toHaveAttribute("href", "/quemSomos");
  });

  it("deve renderizar os links de redes sociais com os atributos corretos", () => {
    renderFooter();

    const instagramLink = screen.getByRole("link", {
      name: /visite nosso Instagram/i,
    });
    expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com");
    expect(instagramLink).toHaveAttribute("target", "_blank");

    const facebookLink = screen.getByRole("link", {
      name: /visite nosso Facebook/i,
    });
    expect(facebookLink).toHaveAttribute("href", "https://www.facebook.com");
  });

  it("deve renderizar um link de e-mail corretamente", () => {
    renderFooter();
    const emailLink = screen.getByRole("link", { name: /- oi@alskin.com.br/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:oi@alskin.com.br");
  });
});
