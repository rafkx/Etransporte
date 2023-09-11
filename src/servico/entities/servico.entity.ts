import { FilesServico } from "src/files-servico/entities/files-servico.entity";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Servico {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descricao: string;

    @Column({ name: 'cod', type: 'varchar', length: 50, unique: true })
    cod: string;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.servicos, { eager: true })
    fornecedor: Fornecedor;

    @ManyToMany(() => Veiculo, { eager: true })
    @JoinTable()
    veiculo: Veiculo[];

    @OneToMany(() => FilesServico, (files) => files.servico)
    files: FilesServico[];
}
