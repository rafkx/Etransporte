import { PartialType } from '@nestjs/swagger';
import { CreateFilesFuncionarioDto } from './create-files-funcionario.dto';

export class UpdateFilesFuncionarioDto extends PartialType(
  CreateFilesFuncionarioDto,
) {}
