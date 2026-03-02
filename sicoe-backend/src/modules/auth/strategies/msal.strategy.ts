import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Request } from 'express';
import * as msal from '@azure/msal-node';

@Injectable()
export class MsalStrategy extends PassportStrategy(CustomStrategy, 'msal') {
  private msalClient: msal.ConfidentialClientApplication | null = null;
  private isConfigured: boolean = false;

  constructor(private configService: ConfigService) {
    super();

    const clientId = this.configService.get<string>('AZURE_AD_CLIENT_ID');
    const tenantId = this.configService.get<string>('AZURE_AD_TENANT_ID');
    const clientSecret = this.configService.get<string>('AZURE_AD_CLIENT_SECRET');

    // Só inicializa MSAL se as credenciais estiverem configuradas
    if (clientId && tenantId && clientSecret &&
        clientId !== 'your-client-id-here' &&
        tenantId !== 'your-tenant-id-here' &&
        clientSecret !== 'your-client-secret-here') {

      const msalConfig: msal.Configuration = {
        auth: {
          clientId,
          authority: `https://login.microsoftonline.com/${tenantId}`,
          clientSecret,
        },
        system: {
          loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
              if (containsPii) {
                return;
              }
              switch (level) {
                case msal.LogLevel.Error:
                  console.error(message);
                  return;
                case msal.LogLevel.Warning:
                  console.warn(message);
                  return;
              }
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Warning,
          },
        },
      };

      this.msalClient = new msal.ConfidentialClientApplication(msalConfig);
      this.isConfigured = true;
      console.log('✅ Azure AD (MSAL) configurado com sucesso');
    } else {
      console.warn('⚠️  Azure AD não configurado - autenticação MSAL desabilitada para este ambiente');
    }
  }

  async validate(request: Request): Promise<any> {
    if (!this.isConfigured || !this.msalClient) {
      throw new UnauthorizedException('Azure AD não está configurado para este ambiente');
    }

    try {
      const code = request.query.code as string;

      if (!code) {
        throw new UnauthorizedException('Código de autorização não fornecido');
      }

      const redirectUri = this.configService.get<string>('AZURE_AD_REDIRECT_URI') || '';

      const tokenRequest: msal.AuthorizationCodeRequest = {
        code,
        scopes: ['user.read', 'profile', 'email', 'openid'],
        redirectUri,
      };

      const response = await this.msalClient.acquireTokenByCode(tokenRequest);

      if (!response || !response.account) {
        throw new UnauthorizedException('Falha na autenticação com EntraID');
      }

      // Retornar informações do usuário
      return {
        email: response.account.username,
        name: response.account.name,
        idToken: response.idToken,
        accessToken: response.accessToken,
        tenantId: response.account.tenantId,
        homeAccountId: response.account.homeAccountId,
      };
    } catch (error) {
      console.error('Erro na autenticação MSAL:', error);
      throw new UnauthorizedException('Falha na autenticação com Microsoft EntraID');
    }
  }

  /**
   * Gera a URL de autorização para redirecionar o usuário
   */
  async getAuthUrl(): Promise<string> {
    if (!this.isConfigured || !this.msalClient) {
      throw new UnauthorizedException('Azure AD não está configurado para este ambiente');
    }

    const redirectUri = this.configService.get<string>('AZURE_AD_REDIRECT_URI') || '';

    const authCodeUrlParameters: msal.AuthorizationUrlRequest = {
      scopes: ['user.read', 'profile', 'email', 'openid'],
      redirectUri,
    };

    return await this.msalClient.getAuthCodeUrl(authCodeUrlParameters);
  }

  /**
   * Valida um token de acesso existente
   */
  async validateAccessToken(accessToken: string): Promise<any> {
    // Implementar validação do token se necessário
    // Por enquanto, retornamos true para tokens válidos
    return accessToken ? true : false;
  }
}
