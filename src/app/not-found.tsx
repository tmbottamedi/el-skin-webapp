"use client";
import styles from "./NotFound.module.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <h2 className={styles.notFoundSubtitle}>Página não encontrada</h2>
      <p className={styles.notFoundDescription}>
        Ops! A página que você está procurando não existe ou foi movida.
      </p>
      <button onClick={handleGoBack} className={styles.notFoundButton}>
        Voltar para a página anterior
      </button>
    </div>
  );
}
