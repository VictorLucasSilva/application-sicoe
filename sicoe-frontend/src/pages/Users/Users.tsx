import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';
import Layout from '@/components/layout/Layout/Layout';
import {
  ReleaseAccessModal,
  EditUserModal,
  EstablishmentAccessModal,
  LoadingModal,
  FilterModal,
  ConfirmModal,
  MessageModal,
} from '@/components/modals';
import type { MessageType } from '@/components/modals';
import { usersService } from '@/services/api/usersService';
import { establishmentService } from '@/services/api/establishmentService';
import { groupsService } from '@/services/api/groupsService';
import type { User as UserType } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler';
import { useTableSort, usePagination, useDebounce } from '@/hooks';
import styles from './Users.module.css';

export default function Users() {
  const navigate = useNavigate();
  const { setLoading: setGlobalLoading } = useLoading();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [total, setTotal] = useState(0);

  // Pagination hook
  const pagination = usePagination({ initialPage: 1, initialLimit: 10, totalItems: total });
  const { page, limit, changeLimit, goToPage, nextPage, prevPage, pageNumbers, canGoNext, canGoPrev } = pagination;

  // Sorting hook
  const { sortedData, requestSort, getSortDirection } = useTableSort(users);

  // Modal states
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEstablishmentModalOpen, setIsEstablishmentModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processando...');
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('success');
  const [pendingSave, setPendingSave] = useState<(() => Promise<void>) | null>(null);

  // Selected data
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [establishments, setEstablishments] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [logins, setLogins] = useState<string[]>([]);

  // Filter states
  const [appliedFilters, setAppliedFilters] = useState<{
    login?: string;
    profiles?: number[];
    statuses?: string[];
    emailStatuses?: string[];
    startDate?: string;
    endDate?: string;
    expirationStartDate?: string;
    expirationEndDate?: string;
  }>({});

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  useEffect(() => {
    fetchUsers();
  }, [page, limit, debouncedSearch, appliedFilters]);

  useEffect(() => {
    fetchGroups();
    fetchEstablishments();
    fetchLogins();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const response = await usersService.getUsers({
        page,
        limit,
        search: debouncedSearch || undefined,
        login: appliedFilters.login,
        profiles: appliedFilters.profiles?.join(','),
        statuses: appliedFilters.statuses?.join(','),
        emailStatuses: appliedFilters.emailStatuses?.join(','),
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
        expirationStartDate: appliedFilters.expirationStartDate,
        expirationEndDate: appliedFilters.expirationEndDate,
      });
      setUsers(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Erro:', error);
      showToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  // Fetch groups for modals
  const fetchGroups = async () => {
    try {
      const response = await groupsService.getAll();
      setGroups(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
    }
  };

  // Fetch logins for filter modal
  const fetchLogins = async () => {
    try {
      const response = await usersService.getLogins();
      setLogins(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar logins:', error);
    }
  };

  // Fetch establishments for modal
  const fetchEstablishments = async () => {
    try {
      const response = await establishmentService.getEstablishments();
      setEstablishments(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos:', error);
      showToast(getErrorMessage(error), 'error');
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
      login: filters.name,
      profiles: filters.profiles,
      statuses: filters.statuses,
      emailStatuses: filters.emailStatuses,
      startDate: filters.startDate,
      endDate: filters.endDate,
      expirationStartDate: filters.expirationStartDate,
      expirationEndDate: filters.expirationEndDate,
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
    if (appliedFilters.statuses && appliedFilters.statuses.length > 0) count++;
    if (appliedFilters.emailStatuses && appliedFilters.emailStatuses.length > 0) count++;
    if (appliedFilters.startDate || appliedFilters.endDate) count++;
    if (appliedFilters.expirationStartDate || appliedFilters.expirationEndDate) count++;
    return count;
  };

  // Handle Access Modal
  const handleOpenAccessModal = () => {
    setIsAccessModalOpen(true);
  };

  // Handle Edit Modal
  const handleOpenEditModal = (user: UserType) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Handle Establishment Modal
  const handleOpenEstablishmentModal = (user: UserType) => {
    setSelectedUser(user);
    fetchEstablishments();
    setIsEstablishmentModalOpen(true);
  };


  return (
    <Layout userName="Usuário" userRole="Area Gerencial">
      <div className={styles.usersPage}>
        {/* Page Header (conforme protótipo: ícone + título + busca + filtros na mesma linha) */}
        <div className={styles.pageHeader}>
          {/* Ícone com polygon amarelo atrás */}
          <div className={styles.iconWrapper}>
            <div className={styles.pageIconPolygon}></div>
            <img
              src="/assets/icons/user-page/logo-page-user.svg"
              alt="Usuários"
              className={styles.pageIcon}
            />
          </div>

          <h1 className={styles.pageTitle}>Gerenciar Usuários</h1>

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
                  onClick={() => requestSort('firstName')}
                  style={{ cursor: 'pointer', width: '200px' }}
                  title="Clique para adicionar ordenação"
                >
                  Nome
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('firstName') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('firstName') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('username')}
                  style={{ cursor: 'pointer', width: '150px' }}
                  title="Clique para adicionar ordenação"
                >
                  Usuário
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('username') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('username') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('groups.0.nmGroup')}
                  style={{ cursor: 'pointer', width: '180px' }}
                  title="Clique para adicionar ordenação"
                >
                  Perfil
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('groups.0.nmGroup') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('groups.0.nmGroup') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('flgActive')}
                  style={{ cursor: 'pointer', width: '120px' }}
                  title="Clique para adicionar ordenação"
                >
                  Status
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('flgActive') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('flgActive') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('flgStatusEmail')}
                  style={{ cursor: 'pointer', width: '140px' }}
                  title="Clique para adicionar ordenação"
                >
                  Envio de Email
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('flgStatusEmail') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('flgStatusEmail') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('tsCreation')}
                  style={{ cursor: 'pointer', width: '130px' }}
                  title="Clique para adicionar ordenação"
                >
                  Data de Entrada
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
                <th
                  className={styles.tableHeaderCell}
                  onClick={() => requestSort('tsExpiration')}
                  style={{ cursor: 'pointer', width: '130px' }}
                  title="Clique para adicionar ordenação"
                >
                  Fim da Vigência
                  <img
                    src="/assets/icons/icon-down.svg"
                    alt="Sort"
                    className={styles.sortIcon}
                    style={{
                      transform: getSortDirection('tsExpiration') === 'desc' ? 'rotate(180deg)' : 'none',
                      opacity: getSortDirection('tsExpiration') ? 1 : 0.3,
                    }}
                  />
                </th>
                <th className={styles.tableHeaderCell} style={{ width: '90px' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                    Carregando...
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                sortedData.map((user) => (
                  <tr key={user.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td className={styles.tableCell}>{user.username}</td>
                    <td className={styles.tableCell}>
                      <span className={styles.tag}>
                        {user.groups[0]?.nmGroup || 'Sem perfil'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.statusWrapper}>
                        <div
                          className={`${styles.statusRadio} ${
                            user.flgActive ? styles.active : ''
                          }`}
                        />
                        <span>{user.flgActive ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.statusWrapper}>
                        <div
                          className={`${styles.statusRadio} ${
                            user.flgStatusEmail ? styles.active : ''
                          }`}
                        />
                        <span>{user.flgStatusEmail ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      {user.tsCreation
                        ? new Date(user.tsCreation).toLocaleDateString('pt-BR')
                        : 'Sem data'}
                    </td>
                    <td className={styles.tableCell}>
                      {user.dtExpiration
                        ? new Date(user.dtExpiration).toLocaleDateString('pt-BR')
                        : 'Sem data'}
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          title="Estabelecimentos"
                          onClick={() => handleOpenEstablishmentModal(user)}
                        >
                          <img
                            src="/assets/icons/user-page/icon-establishment-line-table.svg"
                            alt="Estabelecimentos"
                            className={styles.actionIcon}
                          />
                        </button>
                        <button
                          className={styles.actionButton}
                          title="Editar"
                          onClick={() => handleOpenEditModal(user)}
                        >
                          <img
                            src="/assets/icons/user-page/icon-pen.svg"
                            alt="Editar"
                            className={styles.actionIcon}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

          <button className={styles.accessButton} onClick={handleOpenAccessModal}>
            <img
              src="/assets/icons/icon-plus.svg"
              alt="+"
              className={styles.plusIcon}
            />
            CONCEDER ACESSO
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

        {/* Modals */}
        <ReleaseAccessModal
          isOpen={isAccessModalOpen}
          onClose={() => setIsAccessModalOpen(false)}
          onSuccess={() => {
            setIsAccessModalOpen(false);
            fetchUsers();
          }}
          onRequestSave={(saveFunc) => {
            setPendingSave(() => saveFunc);
            setShowConfirmSave(true);
          }}
          usersPendingAccess={users.filter(u => u.groups?.[0]?.nmGroup === 'Sem Acesso')}
          groupOptions={groups
            .filter(g => g.nmGroup !== 'Sem Acesso')
            .map(g => ({ value: g.id, label: g.nmGroup }))}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onRequestSave={(saveFunc) => {
            setPendingSave(() => saveFunc);
            setShowConfirmSave(true);
          }}
          user={selectedUser ?? null}
          groupOptions={groups.map(g => ({ value: g.id, label: g.nmGroup }))}
        />

        <EstablishmentAccessModal
          isOpen={isEstablishmentModalOpen}
          onClose={() => {
            setIsEstablishmentModalOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            setIsEstablishmentModalOpen(false);
            setSelectedUser(null);
            fetchUsers();
          }}
          onRequestSave={(saveFunc) => {
            setPendingSave(() => saveFunc);
            setShowConfirmSave(true);
          }}
          user={selectedUser ?? null}
          establishmentOptions={establishments.map(e => ({
            value: e.id,
            label: e.nmEstablishment
          }))}
        />

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          nameOptions={logins.map(login => ({ value: login, label: login }))}
          profileOptions={groups.map(g => ({ value: g.id, label: g.nmGroup }))}
          statusOptions={[
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' },
          ]}
          emailStatusOptions={[
            { value: 'enabled', label: 'Habilitado' },
            { value: 'disabled', label: 'Desabilitado' },
          ]}
        />

        <ConfirmModal
          isOpen={showConfirmSave}
          title="Confirmar Alterações"
          message="Deseja realmente salvar as alterações?"
          confirmText="CONFIRMAR"
          onClose={() => {
            setShowConfirmSave(false);
            setPendingSave(null);
          }}
          onConfirm={async () => {
            setShowConfirmSave(false);
            if (pendingSave) {
              setLoadingMessage('Salvando alterações...');
              setIsLoadingModalOpen(true);
              try {
                await pendingSave();
                setIsLoadingModalOpen(false);
                setResultMessage('Alterações salvas com sucesso!');
                setMessageType('success');
                setShowMessageModal(true);
              } catch (error: any) {
                setIsLoadingModalOpen(false);
                setResultMessage(error.message || 'Erro ao salvar alterações');
                setMessageType('error');
                setShowMessageModal(true);
              }
              setPendingSave(null);
            }
          }}
        />

        <LoadingModal isOpen={isLoadingModalOpen} message={loadingMessage} />

        <MessageModal
          isOpen={showMessageModal}
          type={messageType}
          message={resultMessage}
          onClose={() => {
            setShowMessageModal(false);
            if (messageType === 'success') {
              fetchUsers();
            }
          }}
        />
      </div>
    </Layout>
  );
}
