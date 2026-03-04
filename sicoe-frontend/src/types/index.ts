
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


export type RBACGroup =
  | 'Administrador'
  | 'Auditor'
  | 'Gerente Regional'
  | 'Usuário'
  | 'Sem Acesso';


export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}


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


export interface Group {
  id: number;
  nmGroup: string;
  tsCreation: string;
  tsUpdated: string;
}


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


export interface FilterUserParams extends PaginationParams {
  search?: string; 
  name?: string;
  login?: string;
  profile?: string;
  profiles?: string; 
  statuses?: string; 
  emailStatuses?: string; 
  startDate?: string; 
  endDate?: string; 
  expirationStartDate?: string; 
  expirationEndDate?: string; 
  establishmentId?: number;
}

export interface FilterEstablishmentParams extends PaginationParams {
  name?: string;
  code?: string;
  regionId?: number;
  stateId?: number;
}

export interface FilterAuditParams extends PaginationParams {
  search?: string; 
  login?: string;
  profile?: string;
  profiles?: string; 
  actions?: string; 
  objects?: string; 
  actionId?: number;
  objectId?: number;
  userId?: number;
  startDate?: string;
  endDate?: string;
}

export interface FilterEmailParams extends PaginationParams {
  search?: string; 
  type?: string;
  types?: string; 
  subjects?: string; 
  statuses?: string; 
  object?: string;
  destination?: string;
  sent?: boolean;
  startDate?: string;
  endDate?: string;
}
