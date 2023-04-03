import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateFuncionarioDto {

    @IsString()
    @IsNotEmpty()
    nomeFun: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    rg: string;

    @IsString()
    @IsOptional()
    telefone: string;
    
    @IsString()
    @IsOptional()
    sexoFun: string;

    @IsNotEmpty()
    dataNasciFun: Date;
    
    @IsString()
    @IsOptional()
    tituloEleitor: string;
    
    @IsString()
    @IsOptional()
    estadoCivil: string;

    @IsString()
    @IsOptional()
    grauInstrucao: string;

    @IsString()
    @IsOptional()
    rua: string;

    @IsString()
    @IsOptional()
    bairro: string;

    @IsString()
    @IsOptional()
    cep: string;

    @IsInt()
    @IsOptional()
    numero: number;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsNotEmpty()
    funcao: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    salario: number;

    @IsNotEmpty()
    dataAdmissao: Date;

    @IsString()
    @IsOptional()
    horarioTrabalho: string;
    
    @IsString()
    @IsOptional()
    intervaloTrabalho: string;
    
    @IsInt()
    @Min(0)
    @IsOptional()
    contratoExpe: number;
    
    @IsInt()
    @Min(0)
    @IsOptional()
    valeTrans: number;
    
    @IsInt()
    @Min(0)
    @IsOptional()
    valeAlimen: number;
    
    @IsString()
    @IsOptional()
    numCarteiraTrab: string;
    
    @IsString()
    @IsOptional()
    serieCarteiraTrab: string;

    @IsString()
    @IsOptional()
    estadoCarteiraTrab: string;
}
