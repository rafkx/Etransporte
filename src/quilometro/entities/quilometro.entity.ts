import { type } from "os";
import { Abastecimento } from "src/abastecimento/entities/abastecimento.entity";
import { FilesQuilometro } from "src/files-quilometro/entities/files-quilometro.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Quilometro {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_At', type: 'date' })
    createdAt: string;

    @Column({ name: 'quantidade_quilometro', type: 'int' })
    quantKm: number;

    @Column({ name: 'data', type: 'timestamptz' })
    data: Date;

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.km, { eager: true })
    veiculo: Veiculo;

    @OneToMany(() => FilesQuilometro, (files) => files.quilometro)
    files: FilesQuilometro[];
}
