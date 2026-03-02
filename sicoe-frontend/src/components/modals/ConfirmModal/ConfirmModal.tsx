import Modal from '../Modal/Modal';
import Button from '@/components/common/Button';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Ação',
  message,
  confirmText = 'CONFIRMAR',
  isLoading = false
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={isLoading}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      }
    >
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
