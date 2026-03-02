import { describe, it, expect } from 'vitest';
import { getErrorMessage, getFriendlyErrorMessage } from '../errorHandler';

describe('errorHandler utils', () => {
  describe('getErrorMessage', () => {
    it('should extract message from Error object', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    it('should extract message from API error object', () => {
      const apiError = { message: 'API error', statusCode: 400 };
      expect(getErrorMessage(apiError)).toBe('API error');
    });

    it('should return default message for unknown error', () => {
      expect(getErrorMessage(null)).toBe('Ocorreu um erro inesperado');
      expect(getErrorMessage(undefined)).toBe('Ocorreu um erro inesperado');
      expect(getErrorMessage({})).toBe('Ocorreu um erro inesperado');
    });

    it('should convert string error to message', () => {
      expect(getErrorMessage('Simple error')).toBe('Simple error');
    });
  });

  describe('getFriendlyErrorMessage', () => {
    it('should return friendly message for 400 status', () => {
      expect(getFriendlyErrorMessage(400)).toBe('Dados inválidos. Verifique as informações e tente novamente.');
    });

    it('should return friendly message for 401 status', () => {
      expect(getFriendlyErrorMessage(401)).toBe('Não autorizado. Faça login novamente.');
    });

    it('should return friendly message for 403 status', () => {
      expect(getFriendlyErrorMessage(403)).toBe('Acesso negado. Você não tem permissão para esta ação.');
    });

    it('should return friendly message for 404 status', () => {
      expect(getFriendlyErrorMessage(404)).toBe('Recurso não encontrado.');
    });

    it('should return friendly message for 500 status', () => {
      expect(getFriendlyErrorMessage(500)).toBe('Erro no servidor. Tente novamente mais tarde.');
    });

    it('should return generic message for unknown status', () => {
      expect(getFriendlyErrorMessage(418)).toBe('Ocorreu um erro inesperado');
      expect(getFriendlyErrorMessage(999)).toBe('Ocorreu um erro inesperado');
    });

    it('should use default message parameter if provided', () => {
      expect(getFriendlyErrorMessage(999, 'Custom message')).toBe('Custom message');
    });
  });
});
