import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ssv_notification')
export class Notification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'fk_user', type: 'int' })
  fkUser: number; 

  @Column({ name: 'tp_notification', type: 'varchar', length: 50 })
  tpNotification: string; 

  @Column({ name: 'tx_title', type: 'varchar', length: 255 })
  txTitle: string; 

  @Column({ name: 'tx_message', type: 'text' })
  txMessage: string; 

  @Column({ name: 'flg_read', type: 'boolean', default: false })
  flgRead: boolean; 

  @Column({ name: 'ts_read', type: 'timestamp', nullable: true })
  tsRead: Date; 

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;
}
