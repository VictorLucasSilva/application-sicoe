import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EstabAttachment } from './estab-attachment.entity';

@Entity('ssv_estab_status_attachment')
export class EstabStatusAttachment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_status', type: 'varchar', length: 30, unique: true })
  nmStatus: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @OneToMany(() => EstabAttachment, (attachment) => attachment.status)
  attachments: EstabAttachment[];
}
