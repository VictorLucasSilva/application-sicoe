import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EstabRegion } from './estab-region.entity';
import { EstabState } from './estab-state.entity';
import { EstabUnit } from './estab-unit.entity';
import { EstabDocument } from './estab-document.entity';

@Entity('ssv_establishment')
export class Establishment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'sq_establishment', type: 'varchar', length: 20, unique: true })
  sqEstablishment: string;

  @Column({ name: 'nm_establishment', type: 'varchar', length: 50 })
  nmEstablishment: string;

  @Column({ name: 'fk_region', type: 'int', nullable: true })
  fkRegion: number;

  @Column({ name: 'fk_state', type: 'int', nullable: true })
  fkState: number;

  @Column({ name: 'tx_attached_by', type: 'varchar', length: 128, nullable: true })
  txAttachedBy: string;

  @Column({ name: 'tx_checked_by', type: 'varchar', length: 128, nullable: true })
  txCheckedBy: string;

  @Column({ name: 'ts_inserted', type: 'timestamp', nullable: true })
  tsInserted: Date;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  // Relacionamentos
  @ManyToMany(() => User, (user) => user.establishments)
  users: User[];

  @ManyToOne(() => EstabRegion, (region) => region.establishments, {
    nullable: true,
  })
  @JoinColumn({ name: 'fk_region' })
  region: EstabRegion;

  @ManyToOne(() => EstabState, (state) => state.establishments, {
    nullable: true,
  })
  @JoinColumn({ name: 'fk_state' })
  state: EstabState;

  @ManyToMany(() => EstabUnit, (unit) => unit.establishments)
  @JoinTable({
    name: 'ssv_aux_establishment_unit',
    joinColumn: { name: 'fk_establishment', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_unit', referencedColumnName: 'id' },
  })
  units: EstabUnit[];

  @ManyToMany(() => EstabDocument, (document) => document.establishments)
  @JoinTable({
    name: 'ssv_aux_establishment_document',
    joinColumn: { name: 'fk_establishment', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_document', referencedColumnName: 'id' },
  })
  documents: EstabDocument[];
}
