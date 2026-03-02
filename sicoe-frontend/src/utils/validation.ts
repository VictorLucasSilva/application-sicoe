/**
 * Utilitários de validação para formulários
 * Sistema SICOE
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Valida um campo com base nas regras fornecidas
 */
export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    // Required
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.message;
    }

    // Skip other validations if value is empty and not required
    if (!value) continue;

    // Min length
    if (rule.minLength && value.toString().length < rule.minLength) {
      return rule.message;
    }

    // Max length
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      return rule.message;
    }

    // Pattern
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return rule.message;
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return rule.message;
    }
  }

  return null;
}

/**
 * Valida um formulário inteiro
 */
export function validateForm(
  values: Record<string, any>,
  rules: Record<string, ValidationRule[]>
): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = validateField(values[fieldName], rules[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
}

/**
 * Validações comuns reutilizáveis
 */
export const commonValidations = {
  required: (message = 'Campo obrigatório'): ValidationRule => ({
    required: true,
    message,
  }),

  email: (message = 'Email inválido'): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message,
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    minLength: length,
    message: message || `Mínimo de ${length} caracteres`,
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    maxLength: length,
    message: message || `Máximo de ${length} caracteres`,
  }),

  password: (message = 'Senha deve ter no mínimo 8 caracteres, com letras e números'): ValidationRule => ({
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    message,
  }),

  username: (message = 'Login inválido'): ValidationRule => ({
    pattern: /^[a-zA-Z0-9._-]{3,20}$/,
    message,
  }),

  date: (message = 'Data inválida'): ValidationRule => ({
    custom: (value: string) => {
      if (!value) return true;
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message,
  }),

  futureDate: (message = 'Data deve ser futura'): ValidationRule => ({
    custom: (value: string) => {
      if (!value) return true;
      const date = new Date(value);
      return date > new Date();
    },
    message,
  }),

  pastDate: (message = 'Data deve ser passada'): ValidationRule => ({
    custom: (value: string) => {
      if (!value) return true;
      const date = new Date(value);
      return date < new Date();
    },
    message,
  }),
};

/**
 * Hook personalizado para validação de formulários
 */
export function useFormValidation(
  initialValues: Record<string, any>,
  validationRules: Record<string, ValidationRule[]>
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(value, validationRules[name] || []);
      setErrors((prev) => ({
        ...prev,
        [name]: error || '',
      }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(values[name], validationRules[name] || []);
    setErrors((prev) => ({
      ...prev,
      [name]: error || '',
    }));
  };

  const validate = () => {
    const newErrors = validateForm(values, validationRules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
  };
}

// Adicionar import do useState
import { useState } from 'react';
