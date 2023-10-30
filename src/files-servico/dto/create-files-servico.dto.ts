import { IsNotEmpty } from "class-validator";
import { Servico } from "src/servico/entities/servico.entity";

export class CreateFilesServicoDto {

    @IsNotEmpty()
    servico: Servico;
}
