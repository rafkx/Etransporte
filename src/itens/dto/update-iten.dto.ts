import { PartialType } from '@nestjs/swagger';
import { CreateItenDto } from './create-iten.dto';

export class UpdateItenDto extends PartialType(CreateItenDto) {}
