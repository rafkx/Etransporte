import { Module } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoController } from './manutencao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manutencao } from './entities/manutencao.entity';
import { ItemManutencaoPeca } from './entities/item.manutencao.peca.entity';
import { ItemManutencaoServico } from './entities/item.manutencao.servico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manutencao]),
    TypeOrmModule.forFeature([ItemManutencaoPeca]),
    TypeOrmModule.forFeature([ItemManutencaoServico]),
  ],
  controllers: [ManutencaoController],
  providers: [ManutencaoService],
  exports: [ManutencaoService],
})
export class ManutencaoModule {}
