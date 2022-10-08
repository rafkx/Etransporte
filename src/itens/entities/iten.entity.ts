import { Entrada } from "src/entrada/entities/entrada.entity";
import { Saida } from "src/saida/entities/saida.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Iten {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @Column({ name: 'codigo_barras', type: 'varchar', length: 50})
    codBarras: string;

    @Column({ name: 'numero_fabricante', type: 'int' })
    numeroFabricante: number;

    @Column({ name: 'nome_item', type: 'varchar', length: 50})
    nomeItem: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500 })
    descricao: string;

    @Column({ name: 'categoria', type: 'varchar', length: 50 })
    categoria: string;

    @Column({ name: 'dimensoes', type: 'varchar', length: 50 })
    dimensoes: string;

    @Column({ name: 'peso', type: 'varchar', length: 50 })
    peso: string;

    @Column({ name: 'marca_fabricante', type: 'varchar', length: 50 })
    marcaFabricante: string;

    @Column({ name: 'modelo', type: 'varchar', length: 50 })
    modelo: string;

    @Column({ name: 'unidade', type: 'varchar', length: 50 })
    unidade: string;

    @Column({ name: 'localizacao', type: 'varchar', length: 50 })
    localizacao: string;

    @Column({ name: 'quantidade_minima', type: 'int' })
    quantidadeMin: number;

    @OneToMany(() => Entrada, (entradas) => entradas.item)
    entradas: Entrada[];

    @OneToMany(() => Saida, (saidas) => saidas.item)
    saidas: Saida[];

    //iten composto por outro item - manytomany - partes (feito no peca entity)
}
