import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { EstabState } from './estab-state.entity';
import { Establishment } from './establishment.entity';

@Entity('ssv_estab_region')
export class EstabRegion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_region', type: 'varchar', length: 50, unique: true })
  nmRegion: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @OneToMany(() => Establishment, (establishment) => establishment.region)
  establishments: Establishment[];

  @ManyToMany(() => EstabState, (state) => state.regions)
  states: EstabState[];
}
