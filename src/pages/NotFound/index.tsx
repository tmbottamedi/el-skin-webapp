import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Página não encontrada</h2>
      <p className="not-found-description">
        Ops! A página que você está procurando não existe ou foi movida.
      </p>
      <button onClick={handleGoBack} className="not-found-button">
        Voltar para a página anterior
      </button>
    </div>
  );
}
