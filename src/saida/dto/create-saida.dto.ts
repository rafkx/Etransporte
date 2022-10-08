import { IsInt, IsNumber, Min } from "class-validator";

export class CreateSaidaDto {
    
    @IsInt()
    @Min(0)
    quantidade: number;
    
}
