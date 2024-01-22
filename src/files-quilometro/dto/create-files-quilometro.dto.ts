import { IsNotEmpty } from 'class-validator';
import { Quilometro } from 'src/quilometro/entities/quilometro.entity';

export class CreateFilesQuilometroDto {
  @IsNotEmpty()
  quilometro: Quilometro;
}
