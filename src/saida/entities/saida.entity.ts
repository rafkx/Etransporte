import { Estoque } from "src/estoque/entities/estoque.entity";
import { Iten } from "src/itens/entities/iten.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Saida {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.saidas)
    estoque: Estoque;

    @ManyToOne(() => Iten, (item) => item.saidas)
    item: Iten;

    @Column({ name: 'quantidade', type: 'int'})
    quantidade: number;
}
