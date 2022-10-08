import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { Role } from "src/enums/role.enum";

@Entity()
export class UserWeb {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', length: 50})
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 50})
    lastName: string;

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
    
    static role: any;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
