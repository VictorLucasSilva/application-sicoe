import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
  access_token: string;
  refresh_token?: string;
  token_type: string = 'Bearer';
  expires_in: number; 
  user: UserResponseDto;

  constructor(accessToken: string, expiresIn: number, user: UserResponseDto, refreshToken?: string) {
    this.access_token = accessToken;
    this.expires_in = expiresIn;
    this.user = user;
    if (refreshToken) {
      this.refresh_token = refreshToken;
    }
  }
}
