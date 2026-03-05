import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from './permission.entity';

@Entity('ssv_group')
export class Group {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_group', type: 'varchar', length: 20, unique: true })
  nmGroup: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @ManyToMany(() => User, (user) => user.groups)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.groups)
  @JoinTable({
    name: 'ssv_aux_group_permissions',
    joinColumn: { name: 'fk_group', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_permission', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
