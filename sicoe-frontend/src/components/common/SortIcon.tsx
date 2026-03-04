

import type { SortDirection } from '@/hooks/useTableSort';
import styles from './SortIcon.module.css';

interface SortIconProps {
  direction: SortDirection;
  className?: string;
}

export default function SortIcon({ direction, className = '' }: SortIconProps) {
  return (
    <span className={`${styles.sortIcon} ${className}`}>
      {direction === null && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4L11 7H5L8 4Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M8 12L5 9H11L8 12Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      )}
      {direction === 'asc' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4L11 7H5L8 4Z"
            fill="currentColor"
          />
          <path
            d="M8 12L5 9H11L8 12Z"
            fill="currentColor"
            opacity="0.2"
          />
        </svg>
      )}
      {direction === 'desc' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4L11 7H5L8 4Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M8 12L5 9H11L8 12Z"
            fill="currentColor"
          />
        </svg>
      )}
    </span>
  );
}
