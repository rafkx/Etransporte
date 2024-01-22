import { Module } from '@nestjs/common';
import { FilesServicoService } from './files-servico.service';
import { FilesServicoController } from './files-servico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesServico } from './entities/files-servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesServico])],
  controllers: [FilesServicoController],
  providers: [FilesServicoService],
})
export class FilesServicoModule {}
