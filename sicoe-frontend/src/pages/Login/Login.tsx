import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img
            src="/assets/icons/logo-header-amarelo.svg"
            alt="BBTS"
            className={styles.headerLogo}
          />
          <span className={styles.headerTitle}>SICOE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Log In</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Input de Usuário */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  placeholder="Placeholder"
                  required
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Input de Senha */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Senha"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <path
                        d="M12 5C8.24 5 5.04 7.14 3.35 10.35C3.13 10.75 3 11.21 3 11.67C3 12.13 3.13 12.59 3.35 12.99C5.04 16.2 8.24 18.34 12 18.34C15.76 18.34 18.96 16.2 20.65 12.99C20.87 12.59 21 12.13 21 11.67C21 11.21 20.87 10.75 20.65 10.35C18.96 7.14 15.76 5 12 5ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        fill="currentColor"
                        opacity="0.4"
                      />
                    ) : (
                      <path
                        d="M12 6.5C8.24 6.5 5.04 8.64 3.35 11.85C3.13 12.25 3 12.71 3 13.17C3 13.63 3.13 14.09 3.35 14.49C5.04 17.7 8.24 19.84 12 19.84C15.76 19.84 18.96 17.7 20.65 14.49C20.87 14.09 21 13.63 21 13.17C21 12.71 20.87 12.25 20.65 11.85C18.96 8.64 15.76 6.5 12 6.5ZM12 17.5C9.79 17.5 8 15.71 8 13.5C8 11.29 9.79 9.5 12 9.5C14.21 9.5 16 11.29 16 13.5C16 15.71 14.21 17.5 12 17.5ZM12 11.5C10.9 11.5 10 12.4 10 13.5C10 14.6 10.9 15.5 12 15.5C13.1 15.5 14 14.6 14 13.5C14 12.4 13.1 11.5 12 11.5Z"
                        fill="currentColor"
                        opacity="0.4"
                      />
                    )}
                  </svg>
                </button>
              </div>
              <p className={styles.helpText}>
                Senha de 8 caracteres, com números e letras.
              </p>
            </div>

            {error && (
              <div className={styles.error} role="alert">
                {error}
              </div>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© BB Tecnologia e serviços 2023</p>
      </footer>
    </div>
  );
}
