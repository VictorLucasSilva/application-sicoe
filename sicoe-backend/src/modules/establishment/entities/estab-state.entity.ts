import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EstabRegion } from './estab-region.entity';
import { EstabCity } from './estab-city.entity';
import { Establishment } from './establishment.entity';

@Entity('ssv_estab_state')
export class EstabState {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_state', type: 'varchar', length: 50, unique: true })
  nmState: string;

  @Column({ name: 'sg_state', type: 'varchar', length: 2, unique: true })
  sgState: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @OneToMany(() => Establishment, (establishment) => establishment.state)
  establishments: Establishment[];

  @OneToMany(() => EstabCity, (city) => city.state)
  cities: EstabCity[];

  @ManyToMany(() => EstabRegion, (region) => region.states)
  @JoinTable({
    name: 'ssv_aux_region_uf',
    joinColumn: { name: 'fk_state', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_region', referencedColumnName: 'id' },
  })
  regions: EstabRegion[];
}
