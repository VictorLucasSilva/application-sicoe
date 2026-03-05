import { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  required?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
  label,
  error,
  disabled = false,
  minDate,
  maxDate,
  required = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);


  const formatDateDisplay = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const parseDisplayDate = (str: string): Date | null => {
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date;
  };


  const formatDateISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setDisplayValue(formatDateDisplay(date));
        setCurrentMonth(date);
      }
    } else {

      setSelectedDate(null);
      setDisplayValue('');
    }
  }, [value]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    let formatted = '';
    if (val.length > 0) {
      formatted = val.substring(0, 2);
      if (val.length >= 3) {
        formatted += '/' + val.substring(2, 4);
      }
      if (val.length >= 5) {
        formatted += '/' + val.substring(4, 8);
      }
    }

    setDisplayValue(formatted);


    if (formatted.length === 10) {
      const date = parseDisplayDate(formatted);
      if (date && !isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(date);
        onChange(formatDateISO(date));
      }
    }
  };

  const handleInputBlur = () => {
    if (displayValue.length === 10) {
      const date = parseDisplayDate(displayValue);
      if (!date || isNaN(date.getTime())) {
        setDisplayValue('');
        setSelectedDate(null);
      }
    } else if (displayValue.length > 0 && displayValue.length < 10) {
      setDisplayValue('');
      setSelectedDate(null);
    }
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setDisplayValue(formatDateDisplay(date));
    onChange(formatDateISO(date));
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    selectDate(today);
  };


  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const min = new Date(minDate);
      if (date < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      if (date > max) return true;
    }
    return false;
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className={styles.container} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          maxLength={10}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={styles.iconButton}
          aria-label="Abrir calendário"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 2V4M14 2V4M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {error && <span className={styles.error}>{error}</span>}

      {isOpen && !disabled && (
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              onClick={goToPreviousMonth}
              className={styles.navButton}
              aria-label="Mês anterior"
            >
              ‹
            </button>

            <span className={styles.monthYear}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>

            <button
              type="button"
              onClick={goToNextMonth}
              className={styles.navButton}
              aria-label="Próximo mês"
            >
              ›
            </button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map(day => (
              <div key={day} className={styles.weekDay}>{day}</div>
            ))}
          </div>

          <div className={styles.days}>
            {generateCalendarDays().map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isToday = isSameDay(date, new Date());
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isDisabled = isDateDisabled(date);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isDisabled && selectDate(date)}
                  disabled={isDisabled}
                  className={`
                    ${styles.day}
                    ${!isCurrentMonth ? styles.dayOtherMonth : ''}
                    ${isToday ? styles.dayToday : ''}
                    ${isSelected ? styles.daySelected : ''}
                    ${isDisabled ? styles.dayDisabled : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className={styles.calendarFooter}>
            <button
              type="button"
              onClick={goToToday}
              className={styles.todayButton}
            >
              Hoje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
