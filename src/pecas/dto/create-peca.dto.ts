import { IsIn, IsInt, IsNotEmpty, IsObject, IsOptional, isString, IsString, Min } from "class-validator";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Peca } from "../entities/peca.entity";

export class CreatePecaDto {
    
    @IsString()
    @IsNotEmpty()
    nomePeca: string;

    @IsString()
    @IsNotEmpty()
    codPeca: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    marcaFabricante: string;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsOptional()
    pequenaPeca?: Peca[];
    
    fornecedorP: Fornecedor;
    
    veiculo: Veiculo[];
}
