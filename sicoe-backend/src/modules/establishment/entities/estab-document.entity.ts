import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Establishment } from './establishment.entity';
import { EstabAttachment } from './estab-attachment.entity';

@Entity('ssv_estab_document')
export class EstabDocument {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_document', type: 'varchar', length: 100, unique: true })
  nmDocument: string;

  @Column({ name: 'ds_document', type: 'text', nullable: true })
  dsDocument: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @ManyToMany(() => Establishment, (establishment) => establishment.documents)
  establishments: Establishment[];

  @OneToMany(() => EstabAttachment, (attachment) => attachment.document)
  attachments: EstabAttachment[];
}
