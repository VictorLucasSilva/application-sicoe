import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Autocomplete from '@/components/common/Autocomplete';
import ButtonOptions from '@/components/common/ButtonOptions';
import DatePicker from '@/components/common/DatePicker';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import type { ButtonOption } from '@/components/common/ButtonOptions';
import Button from '@/components/common/Button';
import styles from './FilterModal.module.css';

export interface UserFilters {
  name?: string;
  profiles?: (string | number)[];
  statuses?: (string | number)[];
  emailStatuses?: (string | number)[];
  startDate?: string;
  endDate?: string;
  expirationStartDate?: string;
  expirationEndDate?: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: UserFilters) => void;
  onClear: () => void;
  initialFilters?: UserFilters;

  nameOptions?: AutocompleteOption[];
  profileOptions?: ButtonOption[];
  statusOptions?: ButtonOption[];
  emailStatusOptions?: ButtonOption[];
  loading?: boolean;
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialFilters,
  nameOptions = [],
  profileOptions = [],
  statusOptions = [],
  emailStatusOptions = [],
  loading = false
}: FilterModalProps) {
  const [name, setName] = useState(initialFilters?.name || '');
  const [selectedProfiles, setSelectedProfiles] = useState<(string | number)[]>(initialFilters?.profiles || []);
  const [selectedStatuses, setSelectedStatuses] = useState<(string | number)[]>(initialFilters?.statuses || []);
  const [selectedEmailStatuses, setSelectedEmailStatuses] = useState<(string | number)[]>(initialFilters?.emailStatuses || []);
  const [startDate, setStartDate] = useState(initialFilters?.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters?.endDate || '');
  const [expirationStartDate, setExpirationStartDate] = useState(initialFilters?.expirationStartDate || '');
  const [expirationEndDate, setExpirationEndDate] = useState(initialFilters?.expirationEndDate || '');

  const debouncedName = useDebounce(name, 300);


  useEffect(() => {
    if (initialFilters) {
      setName(initialFilters.name || '');
      setSelectedProfiles(initialFilters.profiles || []);
      setSelectedStatuses(initialFilters.statuses || []);
      setSelectedEmailStatuses(initialFilters.emailStatuses || []);
      setStartDate(initialFilters.startDate || '');
      setEndDate(initialFilters.endDate || '');
      setExpirationStartDate(initialFilters.expirationStartDate || '');
      setExpirationEndDate(initialFilters.expirationEndDate || '');
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
    const filters: UserFilters = {};

    if (debouncedName) filters.name = debouncedName;
    if (selectedProfiles.length > 0) filters.profiles = selectedProfiles;
    if (selectedStatuses.length > 0) filters.statuses = selectedStatuses;
    if (selectedEmailStatuses.length > 0) filters.emailStatuses = selectedEmailStatuses;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (expirationStartDate) filters.expirationStartDate = expirationStartDate;
    if (expirationEndDate) filters.expirationEndDate = expirationEndDate;

    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setName('');
    setSelectedProfiles([]);
    setSelectedStatuses([]);
    setSelectedEmailStatuses([]);
    setStartDate('');
    setEndDate('');
    setExpirationStartDate('');
    setExpirationEndDate('');
    onClear();
  };

  const hasFilters = Boolean(
    name ||
    selectedProfiles.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedEmailStatuses.length > 0 ||
    startDate ||
    endDate ||
    expirationStartDate ||
    expirationEndDate
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
              options={nameOptions}
              value={name}
              onChange={(value) => setName(value as string)}
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
              label="Status"
              options={statusOptions}
              value={selectedStatuses}
              onChange={setSelectedStatuses}
              multiSelect
              disabled={loading}
            />
          </div>

          {}
          <div className={styles.field}>
            <ButtonOptions
              label="Envio de Email"
              options={emailStatusOptions}
              value={selectedEmailStatuses}
              onChange={setSelectedEmailStatuses}
              multiSelect
              disabled={loading}
            />
          </div>

          {}
          <div className={styles.field}>
            <label className={styles.dateLabel}>Data de Entrada</label>
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

          {}
          <div className={styles.field}>
            <label className={styles.dateLabel}>Fim da Vigência</label>
            <div className={styles.dateRange}>
              <DatePicker
                label="De"
                value={expirationStartDate}
                onChange={setExpirationStartDate}
                placeholder="dd/mm/aaaa"
                disabled={loading}
              />
              <DatePicker
                label="Até"
                value={expirationEndDate}
                onChange={setExpirationEndDate}
                placeholder="dd/mm/aaaa"
                disabled={loading}
                minDate={expirationStartDate}
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
