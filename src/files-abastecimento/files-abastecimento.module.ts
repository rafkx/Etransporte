import { Module } from '@nestjs/common';
import { FilesAbastecimentoService } from './files-abastecimento.service';
import { FilesAbastecimentoController } from './files-abastecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesAbastecimento } from './entities/files-abastecimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesAbastecimento])],
  controllers: [FilesAbastecimentoController],
  providers: [FilesAbastecimentoService]
})
export class FilesAbastecimentoModule {}
