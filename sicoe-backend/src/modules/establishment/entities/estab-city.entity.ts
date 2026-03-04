import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EstabState } from './estab-state.entity';
import { EstabAttachment } from './estab-attachment.entity';

@Entity('ssv_estab_city')
export class EstabCity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_city', type: 'varchar', length: 100 })
  nmCity: string;

  @Column({ name: 'fk_state', type: 'int' })
  fkState: number;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @ManyToOne(() => EstabState, (state) => state.cities)
  @JoinColumn({ name: 'fk_state' })
  state: EstabState;

  @OneToMany(() => EstabAttachment, (attachment) => attachment.city)
  attachments: EstabAttachment[];
}
