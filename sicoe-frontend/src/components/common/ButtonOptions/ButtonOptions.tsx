import { useState, useEffect } from 'react';
import styles from './ButtonOptions.module.css';

export interface ButtonOption {
  value: string | number;
  label: string;
}

interface ButtonOptionsProps {
  label?: string;
  options: ButtonOption[];
  value?: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function ButtonOptions({
  label,
  options,
  value = [],
  onChange,
  multiSelect = true,
  disabled = false,
  error
}: ButtonOptionsProps) {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(value);

  
  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleToggle = (optionValue: string | number) => {
    if (disabled) return;

    let newSelected: (string | number)[];

    if (multiSelect) {
      
      if (selectedValues.includes(optionValue)) {
        newSelected = selectedValues.filter(v => v !== optionValue);
      } else {
        newSelected = [...selectedValues, optionValue];
      }
    } else {
      
      newSelected = selectedValues.includes(optionValue) ? [] : [optionValue];
    }

    setSelectedValues(newSelected);
    onChange(newSelected);
  };

  const isSelected = (optionValue: string | number) => {
    return selectedValues.includes(optionValue);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.optionsGrid}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            disabled={disabled}
            className={`${styles.optionButton} ${
              isSelected(option.value) ? styles.selected : ''
            } ${disabled ? styles.disabled : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
}
