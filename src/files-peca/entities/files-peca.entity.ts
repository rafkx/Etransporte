import { Peca } from 'src/pecas/entities/peca.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilesPeca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'file_name', type: 'varchar', nullable: false, unique: true })
  fileName: string;

  @Column({ name: 'content_lenght', type: 'int', nullable: false })
  contentLenght: number;

  @Column({ name: 'content_type', type: 'varchar', nullable: true })
  contentType: string;

  @Column({ name: 'url', type: 'varchar', nullable: false })
  url: string;

  @ManyToOne(() => Peca, (peca) => peca.files, { onDelete: 'CASCADE' })
  peca: Peca;
}
