import { PartialType } from '@nestjs/swagger';
import { CreateFilesQuilometroDto } from './create-files-quilometro.dto';

export class UpdateFilesQuilometroDto extends PartialType(
  CreateFilesQuilometroDto,
) {}
