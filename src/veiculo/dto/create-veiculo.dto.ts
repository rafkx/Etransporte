import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

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
    ano: number;

    @IsString()
    @IsNotEmpty()
    modelo: string;

    @IsString()
    @IsNotEmpty()
    marca: string;

    @IsString()
    @IsNotEmpty()
    combustivel: string;

    @IsString()
    @IsNotEmpty()
    ultimaKm: string;

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

    @IsString()
    @IsNotEmpty()
    dataAquisicao: string;

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
