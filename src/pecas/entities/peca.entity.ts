import { FilesPeca } from "src/files-peca/entities/files-peca.entity";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Peca {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'nome_peca', type: 'varchar', length: 50 })
    nomePeca: string;

    @Column({ name: 'codigo_peca', type: 'varchar', length: 50, unique: true })
    codPeca: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descricao: string;

    @Column({ name: 'marca_fabricante', type: 'varchar', length: 50 })
    marcaFabricante: string;

    @Column({ name: 'modelo', type: 'varchar', length: 50 })
    modelo: string;

    @Column({ nullable: true })
    fotoPeca?: string;

    @ManyToMany(() => Peca)
    @JoinTable()
    pequenaPeca?: Peca[];

    @ManyToMany(() => Fornecedor, (fornecedorP) => fornecedorP.peca, { eager: true })
    @JoinTable({
        name: 'peca_fornecedor',
        joinColumn: {
            name: 'peca_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'servico_id',
            referencedColumnName: 'id'
        }
    })
    fornecedorP: Fornecedor[];

    @ManyToMany(() => Veiculo, veiculos => veiculos.pecas, { eager: true })
    @JoinTable({
        name: 'peca_veiculo',
        joinColumn: {
            name: 'peca_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'veiculo_id',
            referencedColumnName: 'id',
        },
    })
    veiculo: Veiculo[];

    @OneToMany(() => FilesPeca, (files) => files.peca)
    files: FilesPeca[];

}
