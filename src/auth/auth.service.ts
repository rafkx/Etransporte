import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { UserWeb } from 'src/user/entities/userWeb.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/role.enum';
import { Payload } from 'src/DTOs/payload.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
    
    async login(user: any) {
        const payload: Payload = {
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            funcionario: user.funcionario.id
        };
        return {
            token: this.jwtService.sign(payload)
        };
    }

    async validateUser (e_mail: string, password: string) {
        let user: UserWeb
        try{
            user = await this.userService.findOneOrFail({ where: {email: e_mail} });
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;

    }
}
