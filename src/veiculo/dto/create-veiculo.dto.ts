import { IsBoolean, IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { Combustivel } from "src/combustivel/entities/combustivel.entity";
import { Funcionario } from "src/funcionario/entities/funcionario.entity";

export class CreateVeiculoDto {
    
    @IsString()
    @IsNotEmpty()
    placa: string;

    @IsString()
    @IsNotEmpty()
    renavam: string;

    @IsString()
    @IsNotEmpty()
    chassi: string;

    @IsString()
    @IsNotEmpty()
    tipoChassi: string;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    ano: number;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    marca: string;

    @IsNotEmpty()
    combustivel: Combustivel;

    @IsInt()
    @IsNotEmpty()
    ultimaKm: number;

    @IsOptional()
    @IsString()
    corInterna: string;

    @IsOptional()
    @IsString()
    corExterna: string;

    @IsInt()
    @IsOptional()
    numMotorInterno: number;

    @IsInt()
    @IsOptional()
    numMotorExterno: number;

    @IsBoolean()
    @IsOptional()
    rastreador: boolean;

    @IsBoolean()
    @IsOptional()
    bloqueador: boolean;

    @IsNotEmpty()
    dataAquisicao: Date;

    @IsString()
    @IsNotEmpty()
    condicao: string;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    valorCompra: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    ValorReforma: number;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    valorMercado: number;

    @IsString()
    @IsNotEmpty()
    nomeVendedor: string;

    @IsString()
    @IsNotEmpty()
    teleVendedor: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;
}
