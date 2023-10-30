import { IsNotEmpty } from "class-validator";
import { Abastecimento } from "src/abastecimento/entities/abastecimento.entity";

export class CreateFilesAbastecimentoDto {

    @IsNotEmpty()
    abastecimento: Abastecimento;
}
