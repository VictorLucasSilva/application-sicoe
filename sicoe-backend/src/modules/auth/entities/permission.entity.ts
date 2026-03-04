import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Group } from './group.entity';

@Entity('ssv_permission')
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tp_permission', type: 'varchar', length: 20, unique: true })
  tpPermission: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @ManyToMany(() => Group, (group) => group.permissions)
  groups: Group[];
}
