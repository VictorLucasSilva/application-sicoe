import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import { AuditFilterModal } from '@/components/modals';
import { auditService } from '@/services/api/auditService';
import { groupsService } from '@/services/api/groupsService';
import type { Audit } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler';
import { useTableSort, usePagination, useDebounce } from '@/hooks';
import { useLoading } from '@/contexts/LoadingContext';
import styles from './Audit.module.css';

export default function AuditPage() {
  const navigate = useNavigate();
  const { setLoading: setGlobalLoading } = useLoading();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter options
  const [groups, setGroups] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [objects, setObjects] = useState<any[]>([]);
  const [logins, setLogins] = useState<string[]>([]);

  // Pagination hook
  const pagination = usePagination({ initialPage: 1, initialLimit: 10, totalItems: total });
  const { page, limit, changeLimit, goToPage, nextPage, prevPage, pageNumbers, canGoNext, canGoPrev } = pagination;

  // Sorting hook
  const { sortedData, requestSort, getSortDirection } = useTableSort(audits);

  // Filter states
  const [appliedFilters, setAppliedFilters] = useState<{
    login?: string;
    profiles?: number[];
    actions?: string[];
    objects?: string[];
    startDate?: string;
    endDate?: string;
  }>({});

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchAudits();
  }, [page, limit, debouncedSearch, appliedFilters]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchAudits = async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const response = await auditService.getAudits({
        page,
        limit,
        search: debouncedSearch || undefined,
        login: appliedFilters.login,
        profiles: appliedFilters.profiles?.join(','),
        actions: appliedFilters.actions?.join(','),
        objects: appliedFilters.objects?.join(','),
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
      });
      setAudits(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Erro:', error);
      showToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const [groupsRes, actionsRes, objectsRes, loginsRes] = await Promise.all([
        groupsService.getAll(),
        auditService.getActions(),
        auditService.getObjects(),
        auditService.getLogins(),
      ]);
      setGroups(groupsRes.data || []);
      setActions(actionsRes.data || []);
      setObjects(objectsRes.data || []);
      setLogins(loginsRes.data || []);
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
      login: filters.login,
      profiles: filters.profiles,
      actions: filters.actions,
      objects: filters.objects,
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
    if (appliedFilters.login) count++;
    if (appliedFilters.profiles && appliedFilters.profiles.length > 0) count++;
    if (appliedFilters.actions && appliedFilters.actions.length > 0) count++;
    if (appliedFilters.objects && appliedFilters.objects.length > 0) count++;
    if (appliedFilters.startDate || appliedFilters.endDate) count++;
    return count;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  return (
    <Layout userName="Usuário" userRole="Area Gerencial">
      <div className={styles.auditPage}>
        {/* Page Header (conforme protótipo: ícone + título + busca + filtros na mesma linha) */}
        <div className={styles.pageHeader}>
          <div className={styles.titleGroup}>
            {/* Ícone com polygon amarelo atrás */}
            <div className={styles.iconWrapper}>
              <div className={styles.pageIconPolygon}></div>
              <img
                src="/assets/icons/audit-page/logo-page-audit.svg"
                alt="Auditoria"
                className={styles.pageIcon}
              />
            </div>
            <h1 className={styles.pageTitle}>Auditoria</h1>
          </div>

          <div className={styles.filtersGroup}>
            {/* Barra de busca */}
            <div className={styles.searchWrapper}>
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
                  onClick={() => requestSort('txLogin')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Login
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('txLogin') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('txLogin') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('txProfile')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Perfil
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('txProfile') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('txProfile') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('action.nmAction')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Ação
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('action.nmAction') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('action.nmAction') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('object.nmObject')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Objeto
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('object.nmObject') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('object.nmObject') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('tsCreation')}
                  style={{ cursor: 'pointer' }}
                  title="Clique para adicionar ordenação"
                >
                  Data/Hora
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('tsCreation') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('tsCreation') ? 1 : 0.3,
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
                    Nenhum registro de auditoria encontrado
                  </td>
                </tr>
              ) : (
                sortedData.map((audit) => {
                  const { date, time } = formatDate(audit.tsCreation);
                  return (
                    <tr key={audit.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{audit.id}</td>
                      <td className={styles.tableCell}>{audit.txLogin || 'N/A'}</td>
                      <td className={styles.tableCell}>
                        <span className={styles.tag}>
                          {audit.txProfile || 'N/A'}
                        </span>
                      </td>
                      <td className={styles.tableCell}>{audit.action?.nmAction || 'N/A'}</td>
                      <td className={styles.tableCell}>{audit.object?.nmObject || 'N/A'}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.dateCell}>
                          {date}
                          <span className={styles.time}>{time}</span>
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

        <AuditFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          loginOptions={logins.map(login => ({ value: login, label: login }))}
          profileOptions={groups.map(g => ({ value: g.id, label: g.nmGroup }))}
          actionOptions={actions.map(a => ({ value: a.nmAction, label: a.nmAction }))}
          objectOptions={objects.map(o => ({ value: o.nmObject, label: o.nmObject }))}
        />
      </div>
    </Layout>
  );
}
