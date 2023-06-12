import { PartialType } from '@nestjs/swagger';
import { CreateCombustivelDto } from './create-combustivel.dto';

export class UpdateCombustivelDto extends PartialType(CreateCombustivelDto) {}
