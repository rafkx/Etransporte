import { IsEmpty } from "class-validator";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export class CreateFilesVeiculoDto {
    
    veiculo: Veiculo;
}
