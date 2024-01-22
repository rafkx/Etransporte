import { PartialType } from '@nestjs/swagger';
import { CreateFilesAbastecimentoDto } from './create-files-abastecimento.dto';

export class UpdateFilesAbastecimentoDto extends PartialType(
  CreateFilesAbastecimentoDto,
) {}
