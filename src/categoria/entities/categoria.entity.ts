import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ name: 'nome', type: 'varchar', length: 50 })
    nome: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descri: string;

    @Column({ name: 'pai', type: 'varchar', length: 50 })
    pai: string;
}
