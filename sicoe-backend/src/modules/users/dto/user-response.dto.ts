import { Exclude, Expose, Type } from 'class-transformer';

class GroupResponseDto {
  @Expose()
  id: number;

  @Expose()
  nmGroup: string;
}

class EstablishmentResponseDto {
  @Expose()
  id: number;

  @Expose()
  sqEstablishment: string;

  @Expose()
  nmEstablishment: string;
}

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  numEmployee: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  flgActive: boolean;

  @Expose()
  flgStatusEmail: boolean;

  @Expose()
  dtExpiration: Date;

  @Expose()
  tsLastLogin: Date;

  @Expose()
  tsCreation: Date;

  @Expose()
  tsUpdated: Date;

  @Expose()
  @Type(() => GroupResponseDto)
  groups: GroupResponseDto[];

  @Expose()
  @Type(() => EstablishmentResponseDto)
  establishments: EstablishmentResponseDto[];

  @Expose()
  fullName: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);

    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
