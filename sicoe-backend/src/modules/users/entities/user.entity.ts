import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Group } from '../../auth/entities/group.entity';
import { Establishment } from '../../establishment/entities/establishment.entity';

@Entity('ssv_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'num_employee', type: 'varchar', length: 100, nullable: true })
  numEmployee: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 256, select: false })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 256 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 256 })
  lastName: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ name: 'flg_active', type: 'boolean', default: true })
  flgActive: boolean;

  @Column({ name: 'flg_status_email', type: 'boolean', default: false })
  flgStatusEmail: boolean;

  @Column({ name: 'dt_expiration', type: 'date', nullable: true })
  dtExpiration: Date;

  @Column({ name: 'ts_last_login', type: 'timestamp', nullable: true })
  tsLastLogin: Date;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @ManyToMany(() => Group, (group) => group.users, { eager: true })
  @JoinTable({
    name: 'ssv_aux_user_groups',
    joinColumn: { name: 'fk_user', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_group', referencedColumnName: 'id' },
  })
  groups: Group[];

  @ManyToMany(() => Establishment, (establishment) => establishment.users)
  @JoinTable({
    name: 'ssv_aux_establishment_user',
    joinColumn: { name: 'fk_user', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_establishment', referencedColumnName: 'id' },
  })
  establishments: Establishment[];

  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2')) {
      
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
