import { Module } from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from './entities/unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade])],
  controllers: [UnidadeController],
  providers: [UnidadeService],
})
export class UnidadeModule {}
