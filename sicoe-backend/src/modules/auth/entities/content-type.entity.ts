import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ssv_content_type')
export class ContentType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_table', type: 'varchar', length: 25, unique: true })
  nmTable: string;

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;
}
