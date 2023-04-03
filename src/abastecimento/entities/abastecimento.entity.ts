import { Quilometro } from "src/quilometro/entities/quilometro.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Abastecimento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ name: 'tipo_combustivel', type: 'varchar', length: 50 })
    tipoComb: string;

    @Column({ name: 'quantidade_litros', type: 'float' })
    quantLitros: number;

    @Column({ name: 'valor_litro', type: 'float' })
    valorLitro: number;

    @Column({ name: 'desconto', type: 'float' })
    desconto: number;

    @Column({ name: 'data', type: 'timestamptz' })
    data: Date;

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.abastecimento, { eager: true })
    veiculo: Veiculo;

    @OneToOne(() => Quilometro, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    km: Quilometro;
}
