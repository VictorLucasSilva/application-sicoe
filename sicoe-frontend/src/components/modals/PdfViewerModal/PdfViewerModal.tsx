import Modal from '../Modal/Modal';
import styles from './PdfViewerModal.module.css';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  fileName?: string;
}

export function PdfViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  fileName = 'Documento',
}: PdfViewerModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={fileName}
      size="fullscreen"
    >
      <div className={styles.container}>
        <iframe
          src={pdfUrl}
          className={styles.iframe}
          title={fileName}
        />
      </div>
    </Modal>
  );
}
