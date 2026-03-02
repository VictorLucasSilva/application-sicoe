import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Establishment } from './establishment.entity';

@Entity('ssv_estab_unit')
export class EstabUnit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_unit', type: 'varchar', length: 50, unique: true })
  nmUnit: string;

  @Column({ name: 'ds_unit', type: 'text', nullable: true })
  dsUnit: string; // Descrição da unidade

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  // Relacionamentos
  @ManyToMany(() => Establishment, (establishment) => establishment.units)
  establishments: Establishment[];
}
