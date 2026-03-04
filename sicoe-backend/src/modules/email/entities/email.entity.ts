import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('ssv_email')
export class Email {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tp_email', type: 'varchar', length: 50 })
  tpEmail: string; 

  @Column({ name: 'tx_object', type: 'varchar', length: 100, nullable: true })
  txObject: string; 

  @Column({ name: 'tx_destination', type: 'varchar', length: 256 })
  txDestination: string; 

  @Column({ name: 'tx_subject', type: 'varchar', length: 255 })
  txSubject: string; 

  @Column({ name: 'tx_body', type: 'text' })
  txBody: string; 

  @Column({ name: 'flg_sent', type: 'boolean', default: false })
  flgSent: boolean; 

  @Column({ name: 'tx_error', type: 'text', nullable: true })
  txError: string; 

  @Column({ name: 'ts_sent', type: 'timestamp', nullable: true })
  tsSent: Date; 

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date; 
}
