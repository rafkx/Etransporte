import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export abstract class ItemManutencao {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descricao: string;

    @Column({ name: 'prazo_km', type: 'float', nullable: true })
    prazoKm: number;

    @Column({ name: 'prazo_messes', type: 'float', nullable: true})
    prazoMeses: number;

    @Column({ name: 'valor', type: 'float' })
    valor: number;

    @ManyToOne(() => Fornecedor)
    fornecedor: Fornecedor;
}
