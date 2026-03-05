import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '../../common/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import LoadingModal from '../LoadingModal/LoadingModal';
import MessageModal from '../MessageModal/MessageModal';
import { PdfViewerModal } from '../PdfViewerModal';
import {
  establishmentStatsService,
  type EstablishmentDetails,
} from '../../../services/api/establishmentStatsService';
import styles from './EstabModal.module.css';

interface EstabModalProps {
  isOpen: boolean;
  onClose: () => void;
  establishmentId: number | null;
  onOpenAttachModal?: (documentId: number) => void;
  refreshTrigger?: number;
}

const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const AttachIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
  </svg>
);

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'regular':
      return '#465EFF';
    case 'vencido':
      return '#E53E3E';
    case 'aVencer':
      return '#DD6B20';
    case 'emAnalise':
      return '#D69E2E';
    case 'invalid':
    case 'missing':
      return '#718096';
    default:
      return '#718096';
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'regular':
      return 'Regular';
    case 'vencido':
      return 'Vencido';
    case 'aVencer':
      return 'A Vencer';
    case 'emAnalise':
      return 'Em Análise';
    case 'invalid':
      return 'Inválido';
    case 'missing':
      return 'Pendente';
    default:
      return status;
  }
};

export function EstabModal({
  isOpen,
  onClose,
  establishmentId,
  onOpenAttachModal,
  refreshTrigger,
}: EstabModalProps) {
  const [data, setData] = useState<EstablishmentDetails | null>(null);
  const [loading, setLoading] = useState(false);


  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [messageText, setMessageText] = useState('');
  const [pendingAction, setPendingAction] = useState<{ type: string; data: any } | null>(null);


  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');

  useEffect(() => {
    if (isOpen && establishmentId) {
      fetchData();
    }
  }, [isOpen, establishmentId, refreshTrigger]);

  const fetchData = async () => {
    if (!establishmentId) return;

    try {
      setLoading(true);
      const details = await establishmentStatsService.getEstablishmentDocuments(
        establishmentId
      );
      setData(details);
    } catch (error) {
      console.error('Erro ao carregar dados do estabelecimento:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (): number => {
    if (!data || data.documents.length === 0) return 0;

    const regularDocs = data.documents.filter(
      (doc) => doc.status === 'regular'
    ).length;

    return Math.round((regularDocs / data.documents.length) * 100);
  };

  const handleViewDoc = (docId: number) => {
    if (!data) return;


    const document = data.documents.find(doc => doc.id === docId);
    if (!document || !document.attachments || document.attachments.length === 0) {
      setMessageType('warning');
      setMessageText('Nenhum anexo disponível para visualização.');
      setIsMessageModalOpen(true);
      return;
    }


    const attachment = document.attachments[0];




    let filePath = attachment.dsFilePath;


    if (!filePath.startsWith('/')) {
      filePath = `/${filePath}`;
    }


    const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:3000';
    const fullPdfUrl = `${backendUrl}${filePath}`;

    console.log('📄 Abrindo PDF:', fullPdfUrl);

    setPdfUrl(fullPdfUrl);
    setPdfFileName(document.nmDocument);
    setIsPdfModalOpen(true);
  };

  const handleAttachDoc = (docId: number) => {
    if (onOpenAttachModal) {
      onOpenAttachModal(docId);
    }
  };

  const handleViewAll = () => {

    setPendingAction({ type: 'viewAll', data: null });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    setIsConfirmModalOpen(false);

    if (!pendingAction) return;


    setIsLoadingModalOpen(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (pendingAction.type === 'viewAll') {
        console.log('Redirecionar para página de todos os documentos');

      }


      setIsLoadingModalOpen(false);
      setMessageType('success');
      setMessageText('Operação realizada com sucesso!');
      setIsMessageModalOpen(true);
    } catch (error) {
      setIsLoadingModalOpen(false);
      setMessageType('error');
      setMessageText('Erro ao realizar operação. Tente novamente.');
      setIsMessageModalOpen(true);
    } finally {
      setPendingAction(null);
    }
  };

  const handleCancelAction = () => {
    setIsConfirmModalOpen(false);
    setPendingAction(null);
  };

  const handleCloseMessage = () => {
    setIsMessageModalOpen(false);

    if (messageType === 'success') {
      fetchData();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.establishment.nmEstablishment || 'Estabelecimento'}
    >
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Carregando dados...</p>
        </div>
      ) : data ? (
        <>
          {}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <BuildingIcon />
              <h3>Unidade</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Nome:</span>
                <span className={styles.value}>
                  {data.establishment.nmEstablishment}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>CNPJ:</span>
                <span className={styles.value}>
                  {data.units[0]?.cnpj || 'N/A'}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Registro:</span>
                <span className={styles.value}>
                  {data.establishment.sqEstablishment}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Região:</span>
                <span className={styles.value}>
                  {data.establishment.region?.nmRegion || 'N/A'}
                </span>
              </div>
            </div>
          </section>

          {}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <PersonIcon />
              <h3>Responsáveis</h3>
            </div>
            {data.responsibles.length > 0 ? (
              <div className={styles.responsiblesList}>
                <div className={styles.responsibleHeader}>
                  <span>Nome</span>
                  <span>Email</span>
                  <span>Cargo</span>
                  <span>UOR</span>
                </div>
                {data.responsibles.map((resp, idx) => (
                  <div className={styles.responsibleRow} key={idx}>
                    <span className={styles.name}>{resp.name}</span>
                    <span className={styles.email}>{resp.email}</span>
                    <span className={styles.role}>{resp.role}</span>
                    <span className={styles.uor}>{resp.uor}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyMessage}>
                Nenhum responsável cadastrado.
              </p>
            )}
          </section>

          {}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <WarningIcon />
              <h3>Pendências</h3>
            </div>
            {data.documents.filter((doc) => doc.status !== 'regular')
              .length > 0 ? (
              <div className={styles.pendenciesList}>
                {data.documents
                  .filter((doc) => doc.status !== 'regular')
                  .map((doc) => (
                    <div className={styles.pendencyRow} key={doc.id}>
                      <div
                        className={styles.statusIndicator}
                        style={{ backgroundColor: getStatusColor(doc.status) }}
                      />
                      <span className={styles.docName}>{doc.nmDocument}</span>
                      <span className={styles.statusLabel}>
                        {getStatusLabel(doc.status)}
                      </span>
                      <div className={styles.actions}>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleViewDoc(doc.id)}
                          title="Visualizar"
                        >
                          <EyeIcon />
                        </button>
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => handleAttachDoc(doc.id)}
                        >
                          <AttachIcon />
                          <span>ANEXAR</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className={styles.emptyMessage}>
                Nenhuma pendência encontrada. Todos os documentos estão
                regulares! 🎉
              </p>
            )}
          </section>

          {}
          <footer className={styles.footer}>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <span className={styles.percentage}>{calculateProgress()}%</span>
            </div>
            <Button variant="primary" onClick={handleViewAll}>
              VER TODOS
            </Button>
          </footer>
        </>
      ) : (
        <div className={styles.error}>
          <p>Erro ao carregar dados do estabelecimento.</p>
        </div>
      )}

      {}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelAction}
        onConfirm={handleConfirmAction}
        title="Confirmar Ação"
        message="Deseja visualizar todos os documentos deste estabelecimento?"
      />

      {}
      <LoadingModal
        isOpen={isLoadingModalOpen}
        message="Processando solicitação..."
      />

      {}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessage}
        type={messageType}
        message={messageText}
      />

      {}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={pdfUrl}
        fileName={pdfFileName}
      />
    </Modal>
  );
}
