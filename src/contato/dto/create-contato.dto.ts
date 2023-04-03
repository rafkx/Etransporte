import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";

export class CreateContatoDto {
    
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    apelido: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
