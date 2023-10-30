import { IsNotEmpty } from "class-validator";
import { Peca } from "src/pecas/entities/peca.entity";

export class CreateFilesPecaDto {

    @IsNotEmpty()
    peca: Peca;
}
