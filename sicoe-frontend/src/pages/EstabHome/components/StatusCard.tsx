import type { ReactNode } from 'react';
import styles from './StatusCard.module.css';

interface StatusCardProps {
  label: string;
  count: number;
  percentage: number;
  color: 'blue' | 'red' | 'gray' | 'orange' | 'yellow';
  icon: ReactNode;
  showProgressBar?: boolean;
}

export function StatusCard({ label, count, percentage, color, icon, showProgressBar = false }: StatusCardProps) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <span className={styles.title}>{label}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stats}>
        <span className={styles.count}>{count}+</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      {showProgressBar && (
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
