import { type } from "os";
import { Abastecimento } from "src/abastecimento/entities/abastecimento.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Quilometro {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ name: 'quantidade_quilometro', type: 'int' })
    quantKm: number;

    @Column({ name: 'data', type: 'timestamptz' })
    data: Date;

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.km, { eager: true })
    veiculo: Veiculo;
}
