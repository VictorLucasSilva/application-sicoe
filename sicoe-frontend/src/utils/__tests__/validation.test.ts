import { describe, it, expect } from 'vitest';
import { validateField, validateForm } from '../validation';

describe('validation utils', () => {
  describe('validateField', () => {
    it('should validate required field', () => {
      const error = validateField('', [{ required: true, message: 'Required' }]);
      expect(error).toBe('Required');

      const noError = validateField('value', [{ required: true, message: 'Required' }]);
      expect(noError).toBeNull();
    });

    it('should validate minLength', () => {
      const error = validateField('ab', [{ minLength: 3, message: 'Too short' }]);
      expect(error).toBe('Too short');

      const noError = validateField('abc', [{ minLength: 3, message: 'Too short' }]);
      expect(noError).toBeNull();
    });

    it('should validate maxLength', () => {
      const error = validateField('abcdef', [{ maxLength: 5, message: 'Too long' }]);
      expect(error).toBe('Too long');

      const noError = validateField('abcde', [{ maxLength: 5, message: 'Too long' }]);
      expect(noError).toBeNull();
    });

    it('should validate email pattern', () => {
      const error = validateField('invalid-email', [
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
      ]);
      expect(error).toBe('Invalid email');

      const noError = validateField('test@example.com', [
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
      ]);
      expect(noError).toBeNull();
    });

    it('should validate pattern', () => {
      const error = validateField('abc', [{ pattern: /^[0-9]+$/, message: 'Only numbers' }]);
      expect(error).toBe('Only numbers');

      const noError = validateField('123', [{ pattern: /^[0-9]+$/, message: 'Only numbers' }]);
      expect(noError).toBeNull();
    });

    it('should validate custom function', () => {
      const customValidator = (value: any) => value !== 'forbidden';
      const error = validateField('forbidden', [
        { custom: customValidator, message: 'Forbidden value' },
      ]);
      expect(error).toBe('Forbidden value');

      const noError = validateField('allowed', [
        { custom: customValidator, message: 'Forbidden value' },
      ]);
      expect(noError).toBeNull();
    });

    it('should return first error only', () => {
      const error = validateField('a', [
        { minLength: 3, message: 'Too short' },
        { maxLength: 2, message: 'Too long' },
      ]);
      expect(error).toBe('Too short');
    });
  });

  describe('validateForm', () => {
    it('should validate all fields', () => {
      const formData = {
        username: '',
        email: 'invalid',
        password: '123',
      };

      const rules = {
        username: [{ required: true, message: 'Username required' }],
        email: [{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }],
        password: [{ minLength: 6, message: 'Password too short' }],
      };

      const errors = validateForm(formData, rules);

      expect(errors.username).toBe('Username required');
      expect(errors.email).toBe('Invalid email');
      expect(errors.password).toBe('Password too short');
    });

    it('should return empty object for valid form', () => {
      const formData = {
        username: 'john',
        email: 'john@example.com',
        password: '123456',
      };

      const rules = {
        username: [{ required: true, message: 'Username required' }],
        email: [{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }],
        password: [{ minLength: 6, message: 'Password too short' }],
      };

      const errors = validateForm(formData, rules);

      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
