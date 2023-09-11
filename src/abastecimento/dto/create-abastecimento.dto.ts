import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Combustivel } from "src/combustivel/entities/combustivel.entity";
import { Quilometro } from "src/quilometro/entities/quilometro.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export class CreateAbastecimentoDto {
    
    combustivel: Combustivel;
    
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantLitros: number;
    
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    valorLitro: number;
    
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    desconto: number;
    
    @IsNotEmpty()
    data: Date;

    veiculo: Veiculo;
    
    km: Quilometro;
}
