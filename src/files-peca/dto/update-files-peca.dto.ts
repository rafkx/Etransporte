import { PartialType } from '@nestjs/swagger';
import { CreateFilesPecaDto } from './create-files-peca.dto';

export class UpdateFilesPecaDto extends PartialType(CreateFilesPecaDto) {}
