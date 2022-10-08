import { Estoque } from "src/estoque/entities/estoque.entity";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Iten } from "src/itens/entities/iten.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Entrada {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.entradas)//manytoone
    estoque: Estoque;

    @ManyToOne(() => Iten, (item) => item.entradas)//manytoone
    item: Iten;

    @Column({ name: 'number', type: 'int'})
    quant: number;

    @Column({ name: 'valor_aquisicao', type: 'int'})
    valorAquisicao: number;

    @Column({ name: 'data', type: 'timestamptz'})
    data: Date;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.entradas)//manytoone
    fornecedor: Fornecedor;
}
