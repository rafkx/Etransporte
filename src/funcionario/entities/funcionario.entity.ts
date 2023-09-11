import { FilesFuncionario } from "src/files-funcionario/entities/files-funcionario.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Funcionario extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ name: 'nomeFun', type: 'varchar', length: 50 })
    nomeFun: string;

    @Column({ name: 'cpf', type: 'varchar', length: 50 })
    cpf: string;

    @Column({ name: 'rg', type: 'varchar', length: 50 })
    rg: string;

    @Column({ name: 'telefone', type: 'varchar', nullable: true, length: 50 })
    telefone?: string;

    @Column({ name: 'sexoFun', type: 'varchar', nullable: true, length: 50 })
    sexoFun?: string;

    @Column({ name: 'dataNasciFun', type: 'timestamptz' })
    dataNasciFun: Date;

    @Column({ name: 'tituloEleitor', type: 'varchar', nullable: true, length: 50 })
    tituloEleitor?: string;

    @Column({ name: 'estadoCivil', type: 'varchar', nullable: true, length: 50 })
    estadoCivil?: string;

    @Column({ name: 'grauInstrucao', type: 'varchar', nullable: true, length: 50 })
    grauInstrucao?: string;

    @Column({ name: 'rua', type: 'varchar', nullable: true, length: 100})
    rua?: string;

    @Column({ name: 'bairro', type: 'varchar', nullable: true, length: 100 })
    bairro?: string;

    @Column({ name: 'cep', type: 'varchar', nullable: true, length: 50 })
    cep?: string;

    @Column({ name: 'numero', type: 'int', nullable: true })
    numero?: number;

    @Column({ name: 'city', type:'varchar', nullable: true, length: 100})
    city?: string;

    @Column({ name: 'funcao', type: 'varchar', length: 100})
    funcao: string;

    @Column({ name: 'salario', type: 'int'})
    salario: number;

    @Column({ name: 'dataAdmissao', type: 'timestamptz' })
    dataAdmissao: Date;

    @Column({ name: 'horarioTrabalho', type: 'varchar', nullable: true, length: 50 })
    horarioTrabalho?: string;

    @Column({ name: 'intervaloTrabalho', type: 'varchar', nullable: true, length: 50 })
    intervaloTrabalho?: string;

    @Column({ name: 'contratoExpe', type: 'int', nullable: true })
    contratoExpe?: number;

    @Column({ name: 'valeTrans', type: 'int', nullable: true })
    valeTrans?: number;

    @Column({ name: 'valeAlimen', type: 'int', nullable: true })
    valeAlimen?: number;

    @Column({ name: 'numCarteiraTrab', type: 'varchar', nullable: true, length: 50})
    numCarteiraTrab?: string;

    @Column({ name: 'serieCarteiraTrab', type: 'varchar', nullable: true, length: 100 })
    serieCarteiraTrab?: string;

    @Column({ name: 'estadoCarteiraTrab', type: 'varchar', nullable: true, length: 100 })
    estadoCarteiraTrab?: string;

    @OneToMany(() => FilesFuncionario, (files) => files.funcionario)
    files: FilesFuncionario[];

    @OneToMany(() => Veiculo, (veiculo) => veiculo.funcionario)
    veiculos: Veiculo[];
}
