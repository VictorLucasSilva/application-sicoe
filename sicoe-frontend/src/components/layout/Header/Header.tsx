import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';
import { useAuthStore } from '@/stores/authStore';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
  userRole?: string;
}

export default function Header({ userRole = 'Area Gerencial' }: HeaderProps) {
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const areaDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { progress } = useLoading();
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target as Node)) {
        setIsAreaDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isAreaDropdownOpen || isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAreaDropdownOpen, isUserDropdownOpen]);

  const toggleAreaDropdown = () => {
    setIsAreaDropdownOpen(!isAreaDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsAreaDropdownOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsAreaDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <header className={styles.header}>
      {/* Barra de progresso de carregamento */}
      {progress > 0 && (
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      )}

      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img
            src="/assets/icons/logo-header-amarelo.svg"
            alt="BB Logo"
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>SICOE</span>
        </div>

        <div className={styles.userArea}>
          {/* Dropdown Area Gerencial */}
          <div className={styles.dropdownWrapper} ref={areaDropdownRef}>
            <button className={styles.userButton} onClick={toggleAreaDropdown}>
              <span>{userRole}</span>
              <img
                src="/assets/icons/icon-down.svg"
                alt="Arrow"
                className={`${styles.arrowIcon} ${isAreaDropdownOpen ? styles.open : ''}`}
                style={{ filter: 'invert(1)' }}
              />
            </button>

            <div className={`${styles.dropdown} ${isAreaDropdownOpen ? styles.open : ''}`}>
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigate('/users')}
              >
                <img
                  src="/assets/icons/icon-dropdown-header-user.svg"
                  alt="Usuários"
                  className={styles.dropdownIcon}
                />
                <span className={styles.dropdownText}>Gerenciar Usuários</span>
              </div>

              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigate('/email')}
              >
                <img
                  src="/assets/icons/icon-dropdown-header-email.svg"
                  alt="Emails"
                  className={styles.dropdownIcon}
                />
                <span className={styles.dropdownText}>Envio de Emails</span>
              </div>

              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigate('/audit')}
              >
                <img
                  src="/assets/icons/icon-dropdown-header-audit.svg"
                  alt="Auditoria"
                  className={styles.dropdownIcon}
                />
                <span className={styles.dropdownText}>Logs para Auditoria</span>
              </div>
            </div>
          </div>

          <span className={styles.divider}>|</span>

          {/* Dropdown User Person */}
          <div className={styles.dropdownWrapper} ref={userDropdownRef}>
            <button className={styles.userButton} onClick={toggleUserDropdown}>
              <div className={styles.userIcon}>
                <img
                  src="/assets/icons/icon-person.svg"
                  alt="User"
                  style={{ width: '20px', height: '20px', filter: 'invert(1)' }}
                />
              </div>
              <img
                src="/assets/icons/icon-down.svg"
                alt="Arrow"
                className={`${styles.arrowIcon} ${isUserDropdownOpen ? styles.open : ''}`}
                style={{ filter: 'invert(1)' }}
              />
            </button>

            <div className={`${styles.dropdown} ${isUserDropdownOpen ? styles.open : ''}`}>
              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigate('/profile')}
              >
                <img
                  src="/assets/icons/icon-person.svg"
                  alt="Perfil"
                  className={styles.dropdownIcon}
                />
                <span className={styles.dropdownText}>Perfil</span>
              </div>

              <div
                className={styles.dropdownItem}
                onClick={() => handleNavigate('/report')}
              >
                <img
                  src="/assets/icons/icon-dropdown-header-audit.svg"
                  alt="Relatório"
                  className={styles.dropdownIcon}
                />
                <span className={styles.dropdownText}>Relatório</span>
              </div>

              <div
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                <img
                  src="/assets/icons/icon-left.svg"
                  alt="Sair"
                  className={styles.dropdownIcon}
                  style={{ transform: 'rotate(180deg)' }}
                />
                <span className={styles.dropdownText}>Sair</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
