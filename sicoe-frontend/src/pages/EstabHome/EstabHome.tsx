import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout/Layout';
import { Sidebar } from '../../components/layout/Sidebar';
import { StatusCard } from './components/StatusCard';
import { EstablishmentCard } from './components/EstablishmentCard';
import { EstabModal } from '../../components/modals/EstabModal';
import { AttachDocModal } from '../../components/modals/AttachDocModal';
import { useLoading } from '../../contexts/LoadingContext';
import {
  establishmentStatsService,
  type StatsResponse,
  type Establishment,
} from '../../services/api/establishmentStatsService';

import styles from './EstabHome.module.css';

// Ícones SVG inline (serão substituídos pelos SVGs reais depois)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const DocIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
  </svg>
);

const EstabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const UnitsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h2v2h-2V5zm-4 0h2v2H8V5zm-2 4h2v2H6V9zm0 4h2v2H6v-2zm10 6H8v-2h10v2zm2-4h-2v-2h2v2zm0-4h-2V9h2v2z"/>
  </svg>
);

const SitDocsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
  </svg>
);

// Ícones para Status Cards
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const sidebarItems = [
  { id: 'home', icon: <HomeIcon />, label: 'Home', path: '/establishments' },
  { id: 'docs', icon: <DocIcon />, label: 'Documentos', path: '/establishments/documents' },
  { id: 'estab', icon: <EstabIcon />, label: 'Estabelecimentos', path: '#', inactive: true },
  { id: 'units', icon: <UnitsIcon />, label: 'Unidades', path: '/establishments/units' },
];

export function EstabHome() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuário';

  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number>(1);
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstabId, setSelectedEstabId] = useState<number | null>(null);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | undefined>(undefined);
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchEstablishmentsByRegion(selectedRegion);
    }
  }, [selectedRegion]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsData = await establishmentStatsService.getStats();
      setStats(statsData);

      // Extrair regiões das estatísticas
      const regionsData = statsData.byRegion.map((r) => ({
        id: r.regionId,
        name: r.regionName,
      }));
      setRegions(regionsData);

      // Selecionar primeira região por padrão
      if (regionsData.length > 0) {
        setSelectedRegion(regionsData[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEstablishmentsByRegion = async (regionId: number) => {
    try {
      setLoading(true);
      const data = await establishmentStatsService.getEstablishmentsByRegion(
        regionId
      );
      setEstablishments(data);
    } catch (error) {
      console.error('Erro ao carregar estabelecimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (estabId: number) => {
    setSelectedEstabId(estabId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEstabId(null);
  };

  const handleOpenAttachModal = (documentId: number) => {
    setSelectedDocumentId(documentId);
    setIsModalOpen(false); // Fecha EstabModal
    setIsAttachModalOpen(true); // Abre AttachModal
  };

  const handleCloseAttachModal = () => {
    setIsAttachModalOpen(false);
    setSelectedDocumentId(undefined);
    // Reabre EstabModal (volta para modal anterior)
    setIsModalOpen(true);
  };

  const handleAttachSuccess = () => {
    // Recarregar dados do estabelecimento no modal Estab
    console.log('Documento anexado com sucesso!');
    // Volta para EstabModal após sucesso
    setIsAttachModalOpen(false);
    setIsModalOpen(true);
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const totalDocuments =
    (stats?.documentStatus.regular || 0) +
    (stats?.documentStatus.invalid || 0) +
    (stats?.documentStatus.vencido || 0) +
    (stats?.documentStatus.aVencer || 0) +
    (stats?.documentStatus.emAnalise || 0);

  return (
    <Layout userName={userName} userRole="Area Gerencial" pageTitle="Controle de Estabelecimentos">
      <div className={styles.container}>
        <Sidebar items={sidebarItems} activePath="" />

      <main className={styles.content}>
        {/* Seção 1: Situação dos Documentos */}
        <section className={styles.statusSection}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <div className={styles.polygon} />
              <SitDocsIcon />
            </div>
            <h2>Situação dos Documentos</h2>
          </div>

          <div className={styles.statusCards}>
            <StatusCard
              label="Regular"
              count={stats?.documentStatus.regular || 0}
              percentage={calculatePercentage(
                stats?.documentStatus.regular || 0,
                totalDocuments
              )}
              color="blue"
              icon={<CheckIcon />}
              showProgressBar={true}
            />
            <StatusCard
              label="Inválido"
              count={stats?.documentStatus.invalid || 0}
              percentage={calculatePercentage(
                stats?.documentStatus.invalid || 0,
                totalDocuments
              )}
              color="red"
              icon={<CloseIcon />}
            />
            <StatusCard
              label="Vencido"
              count={stats?.documentStatus.vencido || 0}
              percentage={calculatePercentage(
                stats?.documentStatus.vencido || 0,
                totalDocuments
              )}
              color="gray"
              icon={<ClockIcon />}
            />
            <StatusCard
              label="A Vencer"
              count={stats?.documentStatus.aVencer || 0}
              percentage={calculatePercentage(
                stats?.documentStatus.aVencer || 0,
                totalDocuments
              )}
              color="orange"
              icon={<AlertIcon />}
            />
            <StatusCard
              label="Em Análise"
              count={stats?.documentStatus.emAnalise || 0}
              percentage={calculatePercentage(
                stats?.documentStatus.emAnalise || 0,
                totalDocuments
              )}
              color="yellow"
              icon={<SearchIcon />}
            />
          </div>
        </section>

        {/* Seção 2: Meus Estabelecimentos */}
        <section className={styles.establishmentsSection}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.iconWrapper}>
                <div className={styles.polygon} />
                <EstabIcon />
              </div>
              <h2>Meus Estabelecimentos</h2>
            </div>

            {/* Botões de regiões ao lado do título */}
            <div className={styles.regionButtons}>
              {regions.map((region) => (
                <button
                  key={region.id}
                  className={
                    selectedRegion === region.id ? styles.active : ''
                  }
                  onClick={() => setSelectedRegion(region.id)}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de estabelecimentos com scroll */}
          {establishments.length > 0 ? (
            <div className={styles.establishmentsGrid}>
              {establishments.map((estab) => (
                <EstablishmentCard
                  key={estab.id}
                  image={estab.imageUrl}
                  title={estab.nmEstablishment}
                  code={estab.sqEstablishment}
                  region={estab.region?.nmRegion}
                  onClick={() => handleOpenModal(estab.id)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Nenhum estabelecimento encontrado para esta região.</p>
            </div>
          )}
        </section>
      </main>

      {/* Modal Estab */}
      <EstabModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        establishmentId={selectedEstabId}
        onOpenAttachModal={handleOpenAttachModal}
      />

      {/* Modal Attach Doc */}
      {selectedEstabId && (
        <AttachDocModal
          isOpen={isAttachModalOpen}
          onClose={handleCloseAttachModal}
          establishmentId={selectedEstabId}
          documentId={selectedDocumentId}
          onSuccess={handleAttachSuccess}
        />
      )}
      </div>
    </Layout>
  );
}
