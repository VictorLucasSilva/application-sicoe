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
  tpEmail: string; // Tipo de e-mail (confirmação, notificação, etc.)

  @Column({ name: 'tx_object', type: 'varchar', length: 100, nullable: true })
  txObject: string; // Objeto relacionado (Usuário, Anexo, etc.)

  @Column({ name: 'tx_destination', type: 'varchar', length: 256 })
  txDestination: string; // E-mail de destino

  @Column({ name: 'tx_subject', type: 'varchar', length: 255 })
  txSubject: string; // Assunto do e-mail

  @Column({ name: 'tx_body', type: 'text' })
  txBody: string; // Corpo do e-mail (pode ser HTML)

  @Column({ name: 'flg_sent', type: 'boolean', default: false })
  flgSent: boolean; // Se foi enviado com sucesso

  @Column({ name: 'tx_error', type: 'text', nullable: true })
  txError: string; // Mensagem de erro (se houver)

  @Column({ name: 'ts_sent', type: 'timestamp', nullable: true })
  tsSent: Date; // Timestamp de envio

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date; // Timestamp de criação do registro
}
