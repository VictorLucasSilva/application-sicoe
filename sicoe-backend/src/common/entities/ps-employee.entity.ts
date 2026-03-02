import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RstEstablishmentEmployee } from './rst-establishment-employee.entity';

@Entity('ssv_ps_employee')
export class PsEmployee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'num_employee', type: 'varchar', length: 100, unique: true })
  numEmployee: string; // Número do funcionário

  @Column({ name: 'nm_employee', type: 'varchar', length: 256 })
  nmEmployee: string; // Nome completo

  @Column({ name: 'tx_email', type: 'varchar', length: 256, nullable: true })
  txEmail: string;

  @Column({ name: 'flg_active', type: 'boolean', default: true })
  flgActive: boolean;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  // Relacionamentos
  @OneToMany(
    () => RstEstablishmentEmployee,
    (relation) => relation.employee,
  )
  establishmentRelations: RstEstablishmentEmployee[];
}
