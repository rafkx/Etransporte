import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";


export class CreateFuncionarioDto {
    @ApiProperty({ example: 'Carlos Rodrigues'})
    @IsString()
    @IsNotEmpty()
    nomeFun: string;

    @ApiProperty({ example: '000.000.000-00'})
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({ example: '00.000.000-0'})
    @IsString()
    @IsNotEmpty()
    rg: string;

    @ApiPropertyOptional({ example: '(00)0000-0000' })
    @IsString()
    @IsOptional()
    telefone: string;
    
    @ApiPropertyOptional({ example: 'Masculino' })
    @IsString()
    @IsOptional()
    sexoFun: string;

    @ApiProperty({ example: '01/01/2000' })
    @IsString()
    @IsNotEmpty()
    dataNasciFun: string;

    @ApiPropertyOptional({ example: '00000000-00' })
    @IsString()
    @IsOptional()
    tituloEleitor: string;

    @ApiPropertyOptional({ example: 'Casado' })
    @IsString()
    @IsOptional()
    estadoCivil: string;

    @ApiPropertyOptional({ example: '2° Grau Completo' })
    @IsString()
    @IsOptional()
    grauInstrucao: string;

    @ApiPropertyOptional({ example: 'Rua Augusta' })
    @IsString()
    @IsOptional()
    rua: string;

    @ApiPropertyOptional({ example: 'Centro' })
    @IsString()
    @IsOptional()
    bairro: string;

    @ApiPropertyOptional({ example: '00000-000' })
    @IsString()
    @IsOptional()
    cep: string;

    @ApiPropertyOptional({ example: '212' })
    @IsString()
    @IsOptional()
    numero: string;

    @ApiPropertyOptional({ example: 'Recife' })
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty({ example: 'Motorista' })
    @IsString()
    @IsNotEmpty()
    funcao: string;

    @ApiProperty({ example: 1000 })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    salario: number;

    @ApiProperty({ example: '02/02/2022' })
    @IsString()
    @IsNotEmpty()
    dataAdmissao: string;

    @ApiPropertyOptional({ example: '8:00 às 17:00' })
    @IsString()
    @IsOptional()
    horarioTrabalho: string;
    
    @ApiPropertyOptional({ example: '12:00 às 13:00' })
    @IsString()
    @IsOptional()
    intervaloTrabalho: string;
    
    @ApiPropertyOptional({ example: 30 })
    @IsInt()
    @Min(0)
    @IsOptional()
    contratoExpe: number;
    
    @ApiPropertyOptional({ example: 200 })
    @IsInt()
    @Min(0)
    @IsOptional()
    valeTrans: number;
    
    @ApiPropertyOptional({ example: 200 })
    @IsInt()
    @Min(0)
    @IsOptional()
    valeAlimen: number;
    
    @ApiPropertyOptional({ example: '000000' })
    @IsString()
    @IsOptional()
    numCarteiraTrab: string;
    
    @ApiPropertyOptional({ example: '003' })
    @IsString()
    @IsOptional()
    serieCarteiraTrab: string;

    @ApiPropertyOptional({ example: 'UF' })
    @IsString()
    @IsOptional()
    estadoCarteiraTrab: string;
}
