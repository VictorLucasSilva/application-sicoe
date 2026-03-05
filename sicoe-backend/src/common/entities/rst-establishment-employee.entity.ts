import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PsEmployee } from './ps-employee.entity';
import { Establishment } from '../../modules/establishment/entities/establishment.entity';

@Entity('ssv_rst_establishment_employee')
export class RstEstablishmentEmployee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'fk_establishment', type: 'int' })
  fkEstablishment: number;

  @Column({ name: 'fk_employee', type: 'int' })
  fkEmployee: number;

  @Column({ name: 'dt_start', type: 'date', nullable: true })
  dtStart: Date;

  @Column({ name: 'dt_end', type: 'date', nullable: true })
  dtEnd: Date;

  @Column({ name: 'flg_active', type: 'boolean', default: true })
  flgActive: boolean;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;


  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'fk_establishment' })
  establishment: Establishment;

  @ManyToOne(() => PsEmployee, (employee) => employee.establishmentRelations)
  @JoinColumn({ name: 'fk_employee' })
  employee: PsEmployee;
}
