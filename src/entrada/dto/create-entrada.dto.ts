import { IsDate, IsIn, IsInt, IsNotEmpty, IsNumber, IsObject } from "class-validator";
import { Estoque } from "src/estoque/entities/estoque.entity";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";

export class CreateEntradaDto {
    
    @IsInt()
    @IsNotEmpty()
    quant: number;
    
    @IsInt()
    @IsNotEmpty()
    valorAquisicao: number;
    
    @IsDate()
    @IsNotEmpty()
    data: Date;

    @IsNotEmpty()
    estoque: Estoque;
    
    @IsNotEmpty()
    fornecedor: Fornecedor;
}
