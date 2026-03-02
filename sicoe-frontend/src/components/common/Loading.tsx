import styles from './Loading.module.css';

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export default function Loading({ fullScreen = false, size = 'medium', message }: LoadingProps) {
  const content = (
    <div className={styles.loadingContent}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className={styles.spinnerRing}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-primary-blue)"
            strokeWidth="8"
            strokeDasharray="70 200"
            strokeLinecap="round"
          />
        </svg>
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>BBTS</span>
        </div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {content}
      </div>
    );
  }

  return content;
}
