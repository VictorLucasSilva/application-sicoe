import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Autocomplete from '@/components/common/Autocomplete';
import ButtonOptions from '@/components/common/ButtonOptions';
import DatePicker from '@/components/common/DatePicker';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import type { ButtonOption } from '@/components/common/ButtonOptions';
import Button from '@/components/common/Button';
import styles from './EmailFilterModal.module.css';

export interface EmailFilters {
  destination?: string;
  types?: (string | number)[];
  subjects?: (string | number)[];
  statuses?: (string | number)[];
  startDate?: string;
  endDate?: string;
}

interface EmailFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: EmailFilters) => void;
  onClear: () => void;
  initialFilters?: EmailFilters;
  // Options
  destinationOptions?: AutocompleteOption[];
  typeOptions?: ButtonOption[];
  subjectOptions?: ButtonOption[];
  statusOptions?: ButtonOption[];
  loading?: boolean;
}

export default function EmailFilterModal({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialFilters,
  destinationOptions = [],
  typeOptions = [],
  subjectOptions = [],
  statusOptions = [],
  loading = false
}: EmailFilterModalProps) {
  const [destination, setDestination] = useState(initialFilters?.destination || '');
  const [selectedTypes, setSelectedTypes] = useState<(string | number)[]>(initialFilters?.types || []);
  const [selectedSubjects, setSelectedSubjects] = useState<(string | number)[]>(initialFilters?.subjects || []);
  const [selectedStatuses, setSelectedStatuses] = useState<(string | number)[]>(initialFilters?.statuses || []);
  const [startDate, setStartDate] = useState(initialFilters?.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters?.endDate || '');

  const debouncedDestination = useDebounce(destination, 300);

  // Update fields when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setDestination(initialFilters.destination || '');
      setSelectedTypes(initialFilters.types || []);
      setSelectedSubjects(initialFilters.subjects || []);
      setSelectedStatuses(initialFilters.statuses || []);
      setStartDate(initialFilters.startDate || '');
      setEndDate(initialFilters.endDate || '');
    }
  }, [initialFilters]);

  // Prevent body scroll
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

  // Close with ESC
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
    const filters: EmailFilters = {};

    if (debouncedDestination) filters.destination = debouncedDestination;
    if (selectedTypes.length > 0) filters.types = selectedTypes;
    if (selectedSubjects.length > 0) filters.subjects = selectedSubjects;
    if (selectedStatuses.length > 0) filters.statuses = selectedStatuses;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setDestination('');
    setSelectedTypes([]);
    setSelectedSubjects([]);
    setSelectedStatuses([]);
    setStartDate('');
    setEndDate('');
    onClear();
  };

  const hasFilters = Boolean(
    destination ||
    selectedTypes.length > 0 ||
    selectedSubjects.length > 0 ||
    selectedStatuses.length > 0 ||
    startDate ||
    endDate
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Modal Lateral Direito */}
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
          {/* Destino */}
          <div className={styles.field}>
            <Autocomplete
              label="Destino"
              options={destinationOptions}
              value={destination}
              onChange={(value) => setDestination(value as string)}
              placeholder="Selecione o destino..."
              disabled={loading}
              emptyMessage="Nenhum destino encontrado"
            />
          </div>

          {/* Tipo */}
          <div className={styles.field}>
            <ButtonOptions
              label="Tipo"
              options={typeOptions}
              value={selectedTypes}
              onChange={setSelectedTypes}
              multiSelect
              disabled={loading}
            />
          </div>

          {/* Assunto */}
          <div className={styles.field}>
            <ButtonOptions
              label="Assunto"
              options={subjectOptions}
              value={selectedSubjects}
              onChange={setSelectedSubjects}
              multiSelect
              disabled={loading}
            />
          </div>

          {/* Status */}
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

          {/* Data de Envio */}
          <div className={styles.field}>
            <label className={styles.dateLabel}>Data de Envio</label>
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
