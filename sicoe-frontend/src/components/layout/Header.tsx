import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userRole = user?.groups?.[0]?.nmGroup || 'Sem Acesso';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src="/logo-bbts-loadding.svg"
            alt="SICOE Logo"
            className={styles.logo}
          />
          <div className={styles.titleSection}>
            <h1 className={styles.title}>SICOE</h1>
            <p className={styles.subtitle}>Sistema de Controle de Estabelecimentos</p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.fullName || user?.username}</span>
              <span className={styles.userRole}>{userRole}</span>
            </div>
            <div className={styles.userAvatar}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={styles.logoutButton}
            aria-label="Sair"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
