import { IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreatePecaDto {
    
    @IsString()
    @IsNotEmpty()
    nomePeca: string;

    @IsString()
    @IsNotEmpty()
    codPeca: string;

    @IsInt()
    @Min(0)
    quantMin: number;
}
