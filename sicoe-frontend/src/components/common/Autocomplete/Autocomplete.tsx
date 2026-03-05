import { useState, useRef, useEffect, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './Autocomplete.module.css';

export interface AutocompleteOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string | number;
  onChange: (value: string | number, option: AutocompleteOption | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  multiSelect?: boolean;
  selectedValues?: (string | number)[];
  onMultiChange?: (values: (string | number)[]) => void;
}

export default function Autocomplete({
  options,
  value,
  onChange,
  placeholder = 'Digite para buscar...',
  label,
  error,
  disabled = false,
  required = false,
  loading = false,
  emptyMessage = 'Nenhum resultado encontrado',
  multiSelect = false,
  selectedValues = [],
  onMultiChange
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalSelectedValues, setInternalSelectedValues] = useState<(string | number)[]>(selectedValues);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);


  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm) return options;

    return options.filter(option =>
      option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [options, debouncedSearchTerm]);


  useEffect(() => {
    setInternalSelectedValues(selectedValues);
  }, [selectedValues]);


  useEffect(() => {
    if (!multiSelect) {
      if (value) {
        const option = options.find(opt => opt.value === value);
        if (option) {
          setSearchTerm(option.label);
        }
      } else {

        setSearchTerm('');
      }
    }
  }, [value, options, multiSelect]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (!multiSelect && value) {
          const option = options.find(opt => opt.value === value);
          if (option) {
            setSearchTerm(option.label);
          }
        } else if (!multiSelect && !value) {
          setSearchTerm('');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, value, options, multiSelect]);


  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (multiSelect) {
      setSearchTerm('');
    }
  };

  const handleSelect = (option: AutocompleteOption) => {
    if (option.disabled) return;

    if (multiSelect) {
      const newSelectedValues = internalSelectedValues.includes(option.value)
        ? internalSelectedValues.filter(v => v !== option.value)
        : [...internalSelectedValues, option.value];

      setInternalSelectedValues(newSelectedValues);
      onMultiChange?.(newSelectedValues);
      setSearchTerm('');
      inputRef.current?.focus();
    } else {
      onChange(option.value, option);
      setSearchTerm(option.label);
      setIsOpen(false);
    }
  };

  const handleRemoveSelected = (valueToRemove: string | number) => {
    const newSelectedValues = internalSelectedValues.filter(v => v !== valueToRemove);
    setInternalSelectedValues(newSelectedValues);
    onMultiChange?.(newSelectedValues);
  };

  const handleClear = () => {
    if (multiSelect) {
      setInternalSelectedValues([]);
      onMultiChange?.([]);
    } else {
      onChange('', null);
      setSearchTerm('');
    }
    inputRef.current?.focus();
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const getSelectedOptions = () => {
    return options.filter(opt => internalSelectedValues.includes(opt.value));
  };

  const hasValue = multiSelect ? internalSelectedValues.length > 0 : Boolean(value);

  return (
    <div className={styles.container} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {multiSelect && internalSelectedValues.length > 0 && (
          <div className={styles.tags}>
            {getSelectedOptions().map(option => (
              <span key={option.value} className={styles.tag}>
                {option.label}
                <button
                  type="button"
                  onClick={() => handleRemoveSelected(option.value)}
                  className={styles.tagRemove}
                  aria-label={`Remover ${option.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className={styles.inputGroup}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            autoComplete="off"
          />

          <div className={styles.iconGroup}>
            {loading && (
              <div className={styles.spinner}>
                <div className={styles.spinnerIcon}></div>
              </div>
            )}

            {hasValue && !loading && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                aria-label="Limpar seleção"
              >
                ×
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              disabled={disabled}
              className={styles.toggleButton}
              aria-label={isOpen ? 'Fechar lista' : 'Abrir lista'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {error && <span className={styles.error}>{error}</span>}

      {isOpen && !disabled && (
        <div className={styles.dropdown} ref={listRef}>
          {filteredOptions.length === 0 ? (
            <div className={styles.emptyMessage}>{emptyMessage}</div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = multiSelect
                ? internalSelectedValues.includes(option.value)
                : value === option.value;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    ${styles.option}
                    ${isSelected ? styles.optionSelected : ''}
                    ${isHighlighted ? styles.optionHighlighted : ''}
                    ${option.disabled ? styles.optionDisabled : ''}
                  `}
                >
                  {multiSelect && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className={styles.checkbox}
                    />
                  )}
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isSelected && !multiSelect && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.3332 4L5.99984 11.3333L2.6665 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
