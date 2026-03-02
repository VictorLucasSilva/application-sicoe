import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuário';

  const handleModuleClick = () => {
    navigate('/users');
  };

  return (
    <Layout userName={userName} userRole="Area Gerencial">
      <div className={styles.homePage}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>
            Bem Vindo <span className={styles.userName}>{userName}!</span>
          </h1>
          <p className={styles.subtitle}>Selecione o módulo:</p>
        </div>

        <div className={styles.modulesContainer}>
          <div className={styles.moduleCard} onClick={handleModuleClick}>
            {/* Ícone temporário - substituir depois */}
            <svg
              className={styles.moduleIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L2 9V11H4V20H11V14H13V20H20V11H22V9L12 3ZM18 18H15V12H9V18H6V9.19L12 5.69L18 9.19V18Z"
                fill="currentColor"
              />
            </svg>
            <h2 className={styles.moduleTitle}>Controle de Estabelecimentos</h2>
            <p className={styles.moduleDescription}>
              Gestão de Documentos, Unidades e Localidades Físicas da Empresa
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
