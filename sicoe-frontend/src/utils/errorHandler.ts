/**
 * Utilitários para tratamento de erros
 * Sistema SICOE
 */

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Extrai mensagem de erro de diferentes tipos de erro
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return String(error.message);
    }
  }

  return 'Ocorreu um erro inesperado';
}

/**
 * Trata erros de resposta da API
 */
export async function handleApiError(response: Response): Promise<ApiError> {
  let errorData: any;

  try {
    errorData = await response.json();
  } catch {
    errorData = { message: response.statusText };
  }

  const error: ApiError = {
    message: errorData.message || 'Erro na requisição',
    statusCode: response.status,
    errors: errorData.errors,
  };

  return error;
}

/**
 * Mensagens de erro amigáveis por código de status
 */
export const errorMessages: Record<number, string> = {
  400: 'Dados inválidos. Verifique as informações e tente novamente.',
  401: 'Não autorizado. Faça login novamente.',
  403: 'Acesso negado. Você não tem permissão para esta ação.',
  404: 'Recurso não encontrado.',
  409: 'Conflito. O recurso já existe.',
  422: 'Dados inválidos. Verifique as informações e tente novamente.',
  429: 'Muitas requisições. Aguarde um momento e tente novamente.',
  500: 'Erro no servidor. Tente novamente mais tarde.',
  502: 'Serviço indisponível. Tente novamente mais tarde.',
  503: 'Serviço em manutenção. Tente novamente mais tarde.',
};

/**
 * Obtém mensagem de erro amigável baseado no código de status
 */
export function getFriendlyErrorMessage(statusCode?: number, defaultMessage?: string): string {
  if (statusCode && errorMessages[statusCode]) {
    return errorMessages[statusCode];
  }
  return defaultMessage || 'Ocorreu um erro inesperado';
}

/**
 * Verifica se um erro é de autenticação
 */
export function isAuthError(error: ApiError): boolean {
  return error.statusCode === 401 || error.statusCode === 403;
}

/**
 * Verifica se um erro é de validação
 */
export function isValidationError(error: ApiError): boolean {
  return error.statusCode === 400 || error.statusCode === 422;
}

/**
 * Formata erros de validação para exibição
 */
export function formatValidationErrors(errors?: Record<string, string[]>): string {
  if (!errors) return '';

  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n');
}

/**
 * Log de erro (pode ser integrado com serviço de monitoramento)
 */
export function logError(error: unknown, context?: string): void {
  console.error(`[${context || 'Error'}]`, error);

  // TODO: Integrar com serviço de monitoramento (Sentry, etc.)
  // if (window.Sentry) {
  //   window.Sentry.captureException(error);
  // }
}
