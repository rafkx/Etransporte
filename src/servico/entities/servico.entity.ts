import { FilesServico } from 'src/files-servico/entities/files-servico.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'descricao', type: 'varchar', length: 500 })
  descricao: string;

  @Column({ name: 'cod', type: 'varchar', length: 50, unique: true })
  cod: string;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.servicos, {
    eager: true,
  })
  @JoinTable({
    name: 'servico_fornecedor',
    joinColumn: {
      name: 'servico_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fornecedor_id',
      referencedColumnName: 'id',
    },
  })
  fornecedor: Fornecedor[];

  @ManyToMany(() => Veiculo, (veiculos) => veiculos.servicos)
  @JoinTable({
    name: 'servico_veiculo',
    joinColumn: {
      name: 'servico_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'veiculo_id',
      referencedColumnName: 'id',
    },
  })
  veiculo: Veiculo[];

  @OneToMany(() => FilesServico, (files) => files.servico)
  files: FilesServico[];
}
