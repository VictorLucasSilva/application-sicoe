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
  fkUser: number; // Usuário destinatário

  @Column({ name: 'tp_notification', type: 'varchar', length: 50 })
  tpNotification: string; // Tipo de notificação

  @Column({ name: 'tx_title', type: 'varchar', length: 255 })
  txTitle: string; // Título da notificação

  @Column({ name: 'tx_message', type: 'text' })
  txMessage: string; // Mensagem

  @Column({ name: 'flg_read', type: 'boolean', default: false })
  flgRead: boolean; // Se foi lida

  @Column({ name: 'ts_read', type: 'timestamp', nullable: true })
  tsRead: Date; // Timestamp de leitura

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;
}
