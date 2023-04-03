import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Contato {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ name: 'nome', type: 'varchar', length: 50 })
    nome: string;

    @Column({ name: 'apelido', type: 'varchar', length: 50 })
    apelido: string;

    @Column({ name: 'telefone', type: 'varchar', length: 50 })
    telefone: string;

    @Column({ name: 'email', type: 'varchar', length: 50 })
    email: string;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.contatos)
    fornecedor: Fornecedor;

}
