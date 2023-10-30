import { IsEmpty, IsNotEmpty } from "class-validator";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export class CreateFilesVeiculoDto {
    
    @IsNotEmpty()
    veiculo: Veiculo;
}
