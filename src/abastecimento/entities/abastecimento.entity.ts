import { Combustivel } from "src/combustivel/entities/combustivel.entity";
import { FilesAbastecimento } from "src/files-abastecimento/entities/files-abastecimento.entity";
import { Quilometro } from "src/quilometro/entities/quilometro.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Abastecimento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

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

    @OneToMany(() => FilesAbastecimento, (files) => files.abastecimento)
    files: FilesAbastecimento[];

    @OneToOne(() => Quilometro, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    km: Quilometro;

    @OneToOne(() => Combustivel, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    combustivel: Combustivel;
}
