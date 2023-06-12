import { IsNotEmpty, IsString } from "class-validator";

export class CreateCombustivelDto {

    @IsString()
    @IsNotEmpty()
    nome: string;
}
