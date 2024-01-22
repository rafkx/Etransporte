import { Abastecimento } from 'src/abastecimento/entities/abastecimento.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilesAbastecimento {
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

  @ManyToOne(() => Abastecimento, (abastecimento) => abastecimento.files, {
    onDelete: 'CASCADE',
  })
  abastecimento: Abastecimento;
}
