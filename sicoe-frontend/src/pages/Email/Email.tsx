import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import { EmailFilterModal } from '@/components/modals';
import { emailService } from '@/services/api/emailService';
import type { Email } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler';
import { useTableSort, usePagination, useDebounce } from '@/hooks';
import { useLoading } from '@/contexts/LoadingContext';
import styles from './Email.module.css';

export default function Email() {
  const navigate = useNavigate();
  const { setLoading: setGlobalLoading } = useLoading();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Pagination hook
  const pagination = usePagination({ initialPage: 1, initialLimit: 10, totalItems: total });
  const { page, limit, changeLimit, goToPage, nextPage, prevPage, pageNumbers, canGoNext, canGoPrev } = pagination;

  // Sorting hook
  const { sortedData, requestSort, getSortDirection } = useTableSort(emails);

  // Filter states
  const [appliedFilters, setAppliedFilters] = useState<{
    destination?: string;
    types?: string[];
    subjects?: string[];
    statuses?: string[];
    startDate?: string;
    endDate?: string;
  }>({});

  // Filter options
  const [emailTypes, setEmailTypes] = useState<string[]>([]);
  const [emailSubjects, setEmailSubjects] = useState<string[]>([]);
  const [emailDestinations, setEmailDestinations] = useState<string[]>([]);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchEmails();
  }, [page, limit, debouncedSearch, appliedFilters]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const response = await emailService.getEmails({
        page,
        limit,
        search: debouncedSearch || undefined,
        destination: appliedFilters.destination,
        types: appliedFilters.types?.join(','),
        subjects: appliedFilters.subjects?.join(','),
        statuses: appliedFilters.statuses?.join(','),
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
      });
      setEmails(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Erro:', error);
      showToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [typesRes, subjectsRes, destinationsRes] = await Promise.all([
        emailService.getTypes(),
        emailService.getSubjects(),
        emailService.getDestinations(),
      ]);
      setEmailTypes(typesRes.data || []);
      setEmailSubjects(subjectsRes.data || []);
      setEmailDestinations(destinationsRes.data || []);
    } catch (error) {
      console.error('Erro ao buscar opções de filtro:', error);
    }
  };

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle filter application
  const handleApplyFilters = (filters: any) => {
    setAppliedFilters({
      destination: filters.destination,
      types: filters.types,
      subjects: filters.subjects,
      statuses: filters.statuses,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
    goToPage(1);
    setIsFilterModalOpen(false);
  };

  // Handle filter clear
  const handleClearFilters = () => {
    setAppliedFilters({});
    goToPage(1);
    // Modal permanece aberto para permitir nova seleção
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (appliedFilters.destination) count++;
    if (appliedFilters.types && appliedFilters.types.length > 0) count++;
    if (appliedFilters.subjects && appliedFilters.subjects.length > 0) count++;
    if (appliedFilters.statuses && appliedFilters.statuses.length > 0) count++;
    if (appliedFilters.startDate || appliedFilters.endDate) count++;
    return count;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return { date: 'N/A', time: '' };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  return (
    <Layout userName="Usuário" userRole="Area Gerencial">
      <div className={styles.emailPage}>
        {/* Page Header (conforme protótipo: ícone + título + busca + filtros na mesma linha) */}
        <div className={styles.pageHeader}>
          {/* Ícone com polygon amarelo atrás */}
          <div className={styles.iconWrapper}>
            <div className={styles.pageIconPolygon}></div>
            <img
              src="/assets/icons/email-page/logo-page-email.svg"
              alt="Emails"
              className={styles.pageIcon}
            />
          </div>

          <h1 className={styles.pageTitle}>Envio de E-mails</h1>

          {/* Barra de busca */}
          <div className={styles.searchWrapper}>
            <img
              src="/assets/icons/icon-search.svg"
              alt="Buscar"
              className={styles.searchIcon}
            />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Botão de filtros */}
          <button className={styles.filterButton} onClick={() => setIsFilterModalOpen(true)}>
            <img
              src="/assets/icons/icon-filter.svg"
              alt="Filtros"
              className={styles.filterIcon}
            />
            <span>Exibir filtros</span>
            {getActiveFiltersCount() > 0 && (
              <span className={styles.filterBadge}>{getActiveFiltersCount()}</span>
            )}
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('id')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  ID
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('id') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('id') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('tpEmail')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Tipo
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('tpEmail') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('tpEmail') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('txSubject')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Assunto
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('txSubject') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('txSubject') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('txDestination')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Destino
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('txDestination') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('txDestination') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('flgSent')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Status
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('flgSent') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('flgSent') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('tsSent')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Data de Envio
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('tsSent') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('tsSent') ? 1 : 0.3,
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    Carregando...
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    Nenhum email encontrado
                  </td>
                </tr>
              ) : (
                sortedData.map((email) => {
                  const { date, time } = formatDate(email.tsSent);
                  return (
                    <tr key={email.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{email.id}</td>
                      <td className={styles.tableCell}>{email.tpEmail || 'N/A'}</td>
                      <td className={styles.tableCell}>{email.txSubject || 'N/A'}</td>
                      <td className={styles.tableCell}>{email.txDestination}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.statusWrapper}>
                          <div
                            className={`${styles.statusRadio} ${
                              email.flgSent ? styles.active : ''
                            }`}
                          />
                          <span>{email.flgSent ? 'Enviado' : 'Pendente'}</span>
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.dateCell}>
                          {date}
                          {time && <span className={styles.time}>{time}</span>}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationInfo}>
              <span>Registros por página</span>
              <select
                className={styles.pageSelect}
                value={limit}
                onChange={(e) => changeLimit(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>
                Exibindo {limit} registros de {total}
              </span>
            </div>

            <div className={styles.paginationControls}>
              <button
                className={`${styles.pageButton} ${styles.arrow}`}
                onClick={prevPage}
                disabled={!canGoPrev}
              >
                ‹
              </button>

              {pageNumbers.map((pageNum, index) =>
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className={styles.pageEllipsis}>
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    className={`${styles.pageButton} ${
                      pageNum === page ? styles.active : ''
                    }`}
                    onClick={() => goToPage(pageNum as number)}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                className={`${styles.pageButton} ${styles.arrow}`}
                onClick={nextPage}
                disabled={!canGoNext}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className={styles.footerButtons}>
          <button className={styles.backButton} onClick={() => navigate('/home')}>
            <img
              src="/assets/icons/icon-left.svg"
              alt="Voltar"
              className={styles.backIcon}
              style={{ filter: 'invert(1)' }}
            />
            VOLTAR
          </button>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '16px 24px',
              backgroundColor: toast.type === 'success' ? '#4CAF50' : '#F44336',
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 9999,
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            {toast.message}
          </div>
        )}

        <EmailFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          destinationOptions={emailDestinations.map(dest => ({ value: dest, label: dest }))}
          typeOptions={emailTypes.map(type => ({ value: type, label: type }))}
          subjectOptions={emailSubjects.map(subject => ({ value: subject, label: subject }))}
          statusOptions={[
            { value: 'sent', label: 'Enviado' },
            { value: 'pending', label: 'Pendente' },
            { value: 'failed', label: 'Falhou' },
          ]}
        />
      </div>
    </Layout>
  );
}
