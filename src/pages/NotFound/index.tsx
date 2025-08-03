import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle className="not-found-subtitle">Página não encontrada</NotFoundSubtitle>
      <NotFoundDescription>
        Ops! A página que você está procurando não existe ou foi movida.
      </NotFoundDescription>
      <button onClick={handleGoBack} className="not-found-button">
        Voltar para a página anterior
      </button>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  font-family: sans-serif;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
`;

const NotFoundDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 400px;
  margin-bottom: 30px;
`;

const NotFoundButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
