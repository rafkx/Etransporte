import { IsNotEmpty, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    email: string;
}
