import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { Funcionario } from "src/funcionario/entities/funcionario.entity";

@Entity()
export class UserWeb {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 50})
    name: string;

    @Column({ name: 'role', type: 'varchar', length: 50})
    role: string;

    @Column({ name: 'email', type: 'varchar', length: 50})
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 500})
    password: string;

    @CreateDateColumn({ name: 'created_At' })
    createdAt: string;

    @UpdateDateColumn({ name: 'update_At' })
    updateAt: string;

    @DeleteDateColumn({ name: 'delete_At' })
    deleteAt: string;

    @OneToOne(() => Funcionario, {
        eager: true,
        cascade: true, 
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'funcionario_id'})
    funcionario: Funcionario;
    
    static role: any;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
