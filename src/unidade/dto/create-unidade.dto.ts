import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnidadeDto {
    
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    sigla: string;
}
