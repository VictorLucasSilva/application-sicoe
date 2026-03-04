import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import logoSicoeV3 from '@/assets/icons/logo-sicoe-v3.svg';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuário';

  const handleModuleClick = () => {
    navigate('/establishments');
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
            <img
              src={logoSicoeV3}
              alt="SICOE"
              className={styles.moduleIcon}
            />
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
