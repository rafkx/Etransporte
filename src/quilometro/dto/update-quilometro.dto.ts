import { PartialType } from '@nestjs/swagger';
import { CreateQuilometroDto } from './create-quilometro.dto';

export class UpdateQuilometroDto extends PartialType(CreateQuilometroDto) {}
