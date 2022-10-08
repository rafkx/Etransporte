import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}
