import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Contato } from "src/contato/entities/contato.entity";

export class CreateFornecedorDto {
    
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsOptional()
    cpf?: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsNotEmpty()
    contatos: Contato[];
}
