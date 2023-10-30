import { IsNotEmpty } from "class-validator";
import { Funcionario } from "src/funcionario/entities/funcionario.entity";

export class CreateFilesFuncionarioDto {

    @IsNotEmpty()
    funcionario: Funcionario;
}
