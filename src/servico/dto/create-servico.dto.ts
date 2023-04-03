import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Fornecedor } from "src/fornecedor/entities/fornecedor.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";

export class CreateServicoDto {

    @IsString()
    @IsNotEmpty()
    descricao: string;
    
    fornecedor: Fornecedor;

    veiculo: Veiculo[];
}
