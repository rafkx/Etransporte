import { IsNotEmpty } from "class-validator";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export class AssociateFuncionarioVeiculoDto {

    @IsNotEmpty()
    veiculos: Veiculo[];
}