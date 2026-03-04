import Modal from '../Modal/Modal';
import styles from './LoadingModal.module.css';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({
  isOpen,
  message = 'Salvando'
}: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} 
      title={message}
      showCloseButton={false}
    >
      <div className={styles.content}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <img
              src="/assets/icons/logo-bbts-loadding.svg"
              alt="BBTS"
              className={styles.logo}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
