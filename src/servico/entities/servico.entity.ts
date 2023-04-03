import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Servico {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descricao: string;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.servicos, { eager: true })
    fornecedor: Fornecedor;

    @ManyToMany(() => Veiculo, { eager: true })
    @JoinTable()
    veiculo: Veiculo[];
}
