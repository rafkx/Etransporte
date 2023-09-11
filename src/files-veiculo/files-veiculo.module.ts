import { Module } from '@nestjs/common';
import { FilesVeiculoService } from './files-veiculo.service';
import { FilesVeiculoController } from './files-veiculo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesVeiculo } from './entities/files-veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesVeiculo])],
  controllers: [FilesVeiculoController],
  providers: [FilesVeiculoService]
})
export class FilesVeiculoModule {}
