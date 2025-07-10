import { useNavigate } from "react-router-dom"; // 1. Importe o hook
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate(); // 2. Inicialize o hook

  const handleGoBack = () => {
    navigate(-1); // 3. A mágica acontece aqui!
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Página não encontrada</h2>
      <p className="not-found-description">
        Ops! A página que você está procurando não existe ou foi movida.
      </p>
      {/* 4. Troque a tag <a> por <button> e adicione o onClick */}
      <button onClick={handleGoBack} className="not-found-button">
        Voltar para a página anterior
      </button>
    </div>
  );
}
