import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Autocomplete from '@/components/common/Autocomplete';
import ButtonOptions from '@/components/common/ButtonOptions';
import DatePicker from '@/components/common/DatePicker';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import type { ButtonOption } from '@/components/common/ButtonOptions';
import Button from '@/components/common/Button';
import styles from './AuditFilterModal.module.css';

export interface AuditFilters {
  login?: string;
  profiles?: (string | number)[];
  actions?: (string | number)[];
  objects?: (string | number)[];
  startDate?: string;
  endDate?: string;
}

interface AuditFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: AuditFilters) => void;
  onClear: () => void;
  initialFilters?: AuditFilters;
  
  loginOptions?: AutocompleteOption[];
  profileOptions?: ButtonOption[];
  actionOptions?: ButtonOption[];
  objectOptions?: ButtonOption[];
  loading?: boolean;
}

export default function AuditFilterModal({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialFilters,
  loginOptions = [],
  profileOptions = [],
  actionOptions = [],
  objectOptions = [],
  loading = false
}: AuditFilterModalProps) {
  const [login, setLogin] = useState(initialFilters?.login || '');
  const [selectedProfiles, setSelectedProfiles] = useState<(string | number)[]>(initialFilters?.profiles || []);
  const [selectedActions, setSelectedActions] = useState<(string | number)[]>(initialFilters?.actions || []);
  const [selectedObjects, setSelectedObjects] = useState<(string | number)[]>(initialFilters?.objects || []);
  const [startDate, setStartDate] = useState(initialFilters?.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters?.endDate || '');

  const debouncedLogin = useDebounce(login, 300);

  
  useEffect(() => {
    if (initialFilters) {
      setLogin(initialFilters.login || '');
      setSelectedProfiles(initialFilters.profiles || []);
      setSelectedActions(initialFilters.actions || []);
      setSelectedObjects(initialFilters.objects || []);
      setStartDate(initialFilters.startDate || '');
      setEndDate(initialFilters.endDate || '');
    }
  }, [initialFilters]);

  
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

  const handleApply = () => {
    const filters: AuditFilters = {};

    if (debouncedLogin) filters.login = debouncedLogin;
    if (selectedProfiles.length > 0) filters.profiles = selectedProfiles;
    if (selectedActions.length > 0) filters.actions = selectedActions;
    if (selectedObjects.length > 0) filters.objects = selectedObjects;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setLogin('');
    setSelectedProfiles([]);
    setSelectedActions([]);
    setSelectedObjects([]);
    setStartDate('');
    setEndDate('');
    onClear();
  };

  const hasFilters = Boolean(
    login ||
    selectedProfiles.length > 0 ||
    selectedActions.length > 0 ||
    selectedObjects.length > 0 ||
    startDate ||
    endDate
  );

  if (!isOpen) return null;

  return (
    <>
      {}
      <div className={styles.backdrop} onClick={onClose} />

      {}
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filtros</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Fechar filtros"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {}
          <div className={styles.field}>
            <Autocomplete
              label="Login"
              options={loginOptions}
              value={login}
              onChange={(value) => setLogin(value as string)}
              placeholder="Selecione o login..."
              disabled={loading}
              emptyMessage="Nenhum login encontrado"
            />
          </div>

          {}
          <div className={styles.field}>
            <ButtonOptions
              label="Perfil"
              options={profileOptions}
              value={selectedProfiles}
              onChange={setSelectedProfiles}
              multiSelect
              disabled={loading}
            />
          </div>

          {}
          <div className={styles.field}>
            <ButtonOptions
              label="Ação"
              options={actionOptions}
              value={selectedActions}
              onChange={setSelectedActions}
              multiSelect
              disabled={loading}
            />
          </div>

          {}
          <div className={styles.field}>
            <ButtonOptions
              label="Objeto"
              options={objectOptions}
              value={selectedObjects}
              onChange={setSelectedObjects}
              multiSelect
              disabled={loading}
            />
          </div>

          {}
          <div className={styles.field}>
            <label className={styles.dateLabel}>Data</label>
            <div className={styles.dateRange}>
              <DatePicker
                label="De"
                value={startDate}
                onChange={setStartDate}
                placeholder="dd/mm/aaaa"
                disabled={loading}
              />
              <DatePicker
                label="Até"
                value={endDate}
                onChange={setEndDate}
                placeholder="dd/mm/aaaa"
                disabled={loading}
                minDate={startDate}
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={handleClear}
            disabled={!hasFilters || loading}
            fullWidth
          >
            Limpar Filtros
          </Button>
          <Button
            variant="primary"
            onClick={handleApply}
            disabled={loading}
            loading={loading}
            fullWidth
          >
            Aplicar
          </Button>
        </div>
      </div>
    </>
  );
}
