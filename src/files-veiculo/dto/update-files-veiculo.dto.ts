import { PartialType } from '@nestjs/swagger';
import { CreateFilesVeiculoDto } from './create-files-veiculo.dto';

export class UpdateFilesVeiculoDto extends PartialType(CreateFilesVeiculoDto) {}
