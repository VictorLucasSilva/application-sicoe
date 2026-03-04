

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}


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


export function getFriendlyErrorMessage(statusCode?: number, defaultMessage?: string): string {
  if (statusCode && errorMessages[statusCode]) {
    return errorMessages[statusCode];
  }
  return defaultMessage || 'Ocorreu um erro inesperado';
}


export function isAuthError(error: ApiError): boolean {
  return error.statusCode === 401 || error.statusCode === 403;
}


export function isValidationError(error: ApiError): boolean {
  return error.statusCode === 400 || error.statusCode === 422;
}


export function formatValidationErrors(errors?: Record<string, string[]>): string {
  if (!errors) return '';

  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n');
}


export function logError(error: unknown, context?: string): void {
  console.error(`[${context || 'Error'}]`, error);

  
  
  
  
}
