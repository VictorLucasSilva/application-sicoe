import { useEffect } from 'react';
import Button from '@/components/common/Button';
import styles from './MessageModal.module.css';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: MessageType;
  title?: string;
  message: string;
  confirmText?: string;
  showIcon?: boolean;
}

export default function MessageModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  confirmText = 'OK',
  showIcon = true
}: MessageModalProps) {
  // Previne scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handler para fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Definir título padrão baseado no tipo
  const defaultTitle = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Atenção',
    info: 'Informação'
  };

  const modalTitle = title || defaultTitle[type];

  // Ícones SVG para cada tipo
  const renderIcon = () => {
    if (!showIcon) return null;

    switch (type) {
      case 'success':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.icon}>
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
            <path
              d="M14 24L20 30L34 16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'error':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.icon}>
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
            <path
              d="M16 16L32 32M32 16L16 32"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.icon}>
            <path
              d="M24 4L44 40H4L24 4Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M24 18V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="32" r="1.5" fill="currentColor" />
          </svg>
        );
      case 'info':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.icon}>
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
            <path d="M24 22V34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="16" r="1.5" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div
        className={`${styles.modal} ${styles[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showIcon && (
          <div className={styles.iconWrapper}>
            {renderIcon()}
          </div>
        )}

        <h2 className={styles.title}>{modalTitle}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={onClose}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
