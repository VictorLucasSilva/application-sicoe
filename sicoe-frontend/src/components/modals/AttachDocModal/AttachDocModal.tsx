import { useState, useEffect, useMemo } from 'react';
import Modal from '../Modal/Modal';
import Button from '../../common/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import LoadingModal from '../LoadingModal/LoadingModal';
import MessageModal from '../MessageModal/MessageModal';
import { FileUpload } from '../../common/FileUpload';
import Autocomplete from '../../common/Autocomplete';
import DatePicker from '../../common/DatePicker';
import { establishmentStatsService } from '../../../services/api/establishmentStatsService';
import styles from './AttachDocModal.module.css';

interface AttachDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  establishmentId: number;
  documentId?: number;
  onSuccess?: () => void;
}

interface DocumentOption {
  value: number;
  label: string;
}

export default function AttachDocModal({
  isOpen,
  onClose,
  establishmentId,
  documentId,
  onSuccess,
}: AttachDocModalProps) {
  // establishmentId será usado na integração com API real (TODO)
  const [selectedDocument, setSelectedDocument] = useState<number | null>(
    documentId || null
  );
  const [dtValidity, setDtValidity] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<(string | null)[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documentTypes, setDocumentTypes] = useState<DocumentOption[]>([]);

  // Estados dos modais do fluxo
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageType, setMessageType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');
  const [messageText, setMessageText] = useState('');

  // Carregar tipos de documentos
  useEffect(() => {
    if (isOpen) {
      // TODO: Buscar do backend
      setDocumentTypes([
        { value: 1, label: 'Alvará de Funcionamento' },
        { value: 2, label: 'Certificado de Regularidade' },
        { value: 3, label: 'Licença Sanitária' },
        { value: 4, label: 'AVCB - Auto de Vistoria do Corpo de Bombeiros' },
        { value: 5, label: 'Certidão Negativa de Débitos' },
      ]);
    }
  }, [isOpen]);

  // Reset form ao abrir/fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedDocument(documentId || null);
      setDtValidity('');
      setFiles([]);
      setErrors([]);
      setUploadProgress(0);
    }
  }, [isOpen, documentId]);

  const isFormValid = useMemo(() => {
    return (
      selectedDocument !== null &&
      dtValidity !== '' &&
      files.length > 0 &&
      !errors.some((err) => err !== null)
    );
  }, [selectedDocument, dtValidity, files, errors]);

  const handleSaveClick = () => {
    if (!isFormValid) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpload = async () => {
    setIsConfirmModalOpen(false);
    setIsLoadingModalOpen(true);

    try {
      // Callback para atualizar progresso
      const onUploadProgress = (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      };

      // DatePicker já retorna em formato ISO (YYYY-MM-DD), então usar diretamente
      // Fazer upload real via API
      await establishmentStatsService.uploadAttachment(
        establishmentId,
        selectedDocument!,
        dtValidity,
        files[0],
        onUploadProgress
      );

      setIsLoadingModalOpen(false);
      setMessageType('success');
      setMessageText('Documento anexado com sucesso!');
      setIsMessageModalOpen(true);
    } catch (error: any) {
      setIsLoadingModalOpen(false);

      if (error.response?.status === 413) {
        setErrors(['Arquivo excede o limite de 10MB']);
        setMessageType('error');
        setMessageText('Arquivo excede o limite de 10MB');
      } else {
        setMessageType('error');
        setMessageText(
          error.response?.data?.message || 'Erro ao enviar documento'
        );
      }
      setIsMessageModalOpen(true);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleCancelUpload = () => {
    setIsConfirmModalOpen(false);
  };

  const handleCloseMessage = () => {
    setIsMessageModalOpen(false);

    if (messageType === 'success') {
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const getMinDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Anexar Documento">
        <div className={styles.form}>
          <div className={styles.row}>
            <Autocomplete
              label="Documento *"
              options={documentTypes}
              value={selectedDocument ?? ''}
              onChange={(value) => setSelectedDocument(typeof value === 'number' ? value : null)}
              placeholder="Selecione o tipo"
              required
            />

            <DatePicker
              label="Data de Vencimento *"
              value={dtValidity}
              onChange={setDtValidity}
              placeholder="DD/MM/AAAA"
              minDate={getMinDate()}
              required
            />
          </div>

          <div className={styles.uploadSection}>
            <label className={styles.label}>
              Arquivo (PDF) <span className={styles.required}>*</span>
            </label>
            <p className={styles.hint}>
              Apenas PDF. O arquivo será validado pelo sistema.
            </p>

            <FileUpload
              accept="application/pdf"
              maxSize={10 * 1024 * 1024} // 10MB
              multiple={false}
              files={files}
              onFilesChange={setFiles}
              errors={errors}
            />
          </div>
        </div>

        <footer className={styles.footer}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoadingModalOpen}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveClick}
            disabled={!isFormValid || isLoadingModalOpen}
          >
            SALVAR
          </Button>
        </footer>
      </Modal>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelUpload}
        onConfirm={handleConfirmUpload}
        title="Confirmar Upload"
        message={`Deseja anexar o documento "${
          documentTypes.find((d) => d.value === selectedDocument)?.label || ''
        }" ao estabelecimento?`}
      />

      {/* Modal de Loading */}
      <LoadingModal
        isOpen={isLoadingModalOpen}
        message={`Enviando documento... ${uploadProgress}%`}
      />

      {/* Modal de Mensagem */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessage}
        type={messageType}
        message={messageText}
      />
    </>
  );
}
