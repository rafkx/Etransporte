import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateItenDto {
    
    @IsString()
    @IsNotEmpty()
    codBarras: string;

    @IsInt()
    @IsNotEmpty()
    numeroFabricante: number;

    @IsString()
    @IsNotEmpty()
    nomeItem: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;
    
    @IsString()
    @IsNotEmpty()
    categoria: string;

    @IsString()
    @IsNotEmpty()
    dimensoes: string;

    @IsString()
    @IsNotEmpty()
    peso: string;

    @IsString()
    @IsNotEmpty()
    marcaFabricante: string;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    unidade: string;

    @IsString()
    @IsNotEmpty()
    localizacao: string;

    @IsInt()
    @Min(0)
    quantidadeMin: number;
}
