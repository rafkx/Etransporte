import { PartialType } from '@nestjs/swagger';
import { CreateFilesServicoDto } from './create-files-servico.dto';

export class UpdateFilesServicoDto extends PartialType(CreateFilesServicoDto) {}
