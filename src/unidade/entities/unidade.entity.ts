import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Unidade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ name: 'nome', type: 'varchar', length: 50 })
    nome: string;
    
    @Column({ name: 'sigla', type: 'varchar', length: 10 })
    sigla: string;
}
