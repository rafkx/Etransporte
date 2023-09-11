import { Abastecimento } from "src/abastecimento/entities/abastecimento.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Combustivel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ name: 'nome', type: 'varchar', length: 50 })
    nome: string;

    @OneToMany(() => Abastecimento, (abastecimentos) => abastecimentos.combustivel)
    abastecimento: Abastecimento[]; 
}
