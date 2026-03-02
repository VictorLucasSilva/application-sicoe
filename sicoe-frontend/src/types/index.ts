// Environment Variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_TIMEOUT: string;
    readonly VITE_AZURE_AD_TENANT_ID: string;
    readonly VITE_AZURE_AD_CLIENT_ID: string;
    readonly VITE_AZURE_AD_REDIRECT_URI: string;
    readonly VITE_NODE_ENV: 'local' | 'development' | 'production';
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// RBAC Groups
export type RBACGroup =
  | 'Administrador'
  | 'Auditor'
  | 'Gerente Regional'
  | 'Usuário'
  | 'Sem Acesso';

// API Response
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Group
export interface Group {
  id: number;
  nmGroup: string;
  tsCreation: string;
  tsUpdated: string;
}

// Establishment
export interface Establishment {
  id: number;
  sqEstablishment: string;
  nmEstablishment: string;
  fkRegion?: number;
  fkState?: number;
  txAttachedBy?: string;
  txCheckedBy?: string;
  tsInserted?: string;
  tsCreation: string;
  tsUpdated: string;
  region?: Region;
  state?: State;
}

export interface Region {
  id: number;
  nmRegion: string;
}

export interface State {
  id: number;
  nmState: string;
  sgState: string;
}

// User
export interface User {
  id: number;
  numEmployee: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  flgActive: boolean;
  flgStatusEmail: boolean;
  dtExpiration?: string;
  tsLastLogin?: string;
  tsCreation: string;
  tsUpdated: string;
  groups: Group[];
  establishments: Establishment[];
  fullName: string;
}

// Auth
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Audit
export interface AudAction {
  id: number;
  nmAction: string;
}

export interface AudObject {
  id: number;
  nmObject: string;
}

export interface Audit {
  id: number;
  fkAction: number;
  fkObject: number;
  fkUser?: number;
  txLogin?: string;
  txProfile?: string;
  txDescription?: string;
  txIpAddress?: string;
  txUserAgent?: string;
  tsCreation: string;
  action: AudAction;
  object: AudObject;
}

// Email
export interface Email {
  id: number;
  tpEmail: string;
  txObject?: string;
  txDestination: string;
  txSubject: string;
  txBody: string;
  flgSent: boolean;
  txError?: string;
  tsSent?: string;
  tsCreation: string;
}

// Filter DTOs
export interface FilterUserParams extends PaginationParams {
  search?: string; // Busca global em todas as colunas
  name?: string;
  login?: string;
  profile?: string;
  profiles?: string; // IDs separados por vírgula
  statuses?: string; // 'active,inactive'
  emailStatuses?: string; // 'enabled,disabled'
  startDate?: string; // Data de entrada (início)
  endDate?: string; // Data de entrada (fim)
  expirationStartDate?: string; // Data de vigência (início)
  expirationEndDate?: string; // Data de vigência (fim)
  establishmentId?: number;
}

export interface FilterEstablishmentParams extends PaginationParams {
  name?: string;
  code?: string;
  regionId?: number;
  stateId?: number;
}

export interface FilterAuditParams extends PaginationParams {
  search?: string; // Busca global em todas as colunas
  login?: string;
  profile?: string;
  profiles?: string; // Perfis separados por vírgula
  actions?: string; // Ações separadas por vírgula
  objects?: string; // Objetos separados por vírgula
  actionId?: number;
  objectId?: number;
  userId?: number;
  startDate?: string;
  endDate?: string;
}

export interface FilterEmailParams extends PaginationParams {
  search?: string; // Busca global em todas as colunas
  type?: string;
  types?: string; // Tipos separados por vírgula
  subjects?: string; // Assuntos separados por vírgula
  statuses?: string; // Status separados por vírgula
  object?: string;
  destination?: string;
  sent?: boolean;
  startDate?: string;
  endDate?: string;
}
