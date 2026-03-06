import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Establishment } from './establishment.entity';
import { EstabDocument } from './estab-document.entity';
import { EstabCity } from './estab-city.entity';
import { EstabRegion } from './estab-region.entity';
import { EstabStatusAttachment } from './estab-status-attachment.entity';

@Entity('ssv_estab_attachment')
export class EstabAttachment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'fk_status', type: 'int' })
  fkStatus: number;

  @Column({ name: 'fk_document', type: 'int' })
  fkDocument: number;

  @Column({ name: 'fk_establishment', type: 'int', nullable: true })
  fkEstablishment: number;

  @Column({ name: 'fk_city', type: 'int', nullable: true })
  fkCity: number;

  @Column({ name: 'fk_region', type: 'int', nullable: true })
  fkRegion: number;

  @Column({ name: 'nm_file', type: 'varchar', length: 255 })
  nmFile: string;

  @Column({ name: 'ds_file_path', type: 'text' })
  dsFilePath: string;

  @Column({ name: 'tx_comments', type: 'text', nullable: true })
  txComments: string;

  @Column({ name: 'dt_emission', type: 'date', nullable: true })
  dtEmission: Date;

  @Column({ name: 'dt_validity', type: 'date', nullable: true })
  dtValidity: Date;

  @Column({ name: 'ts_attached', type: 'timestamp', nullable: true })
  tsAttached: Date;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @ManyToOne(() => EstabStatusAttachment, (status) => status.attachments)
  @JoinColumn({ name: 'fk_status' })
  status: EstabStatusAttachment;

  @ManyToOne(() => EstabDocument, (document) => document.attachments)
  @JoinColumn({ name: 'fk_document' })
  document: EstabDocument;

  @ManyToOne(() => Establishment, (establishment) => establishment.attachments, { nullable: true })
  @JoinColumn({ name: 'fk_establishment' })
  establishment: Establishment;

  @ManyToOne(() => EstabCity, (city) => city.attachments, { nullable: true })
  @JoinColumn({ name: 'fk_city' })
  city: EstabCity;

  @ManyToOne(() => EstabRegion, { nullable: true })
  @JoinColumn({ name: 'fk_region' })
  region: EstabRegion;
}
