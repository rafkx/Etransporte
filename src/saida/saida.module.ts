import { Module } from '@nestjs/common';
import { SaidaService } from './saida.service';
import { SaidaController } from './saida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saida } from './entities/saida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saida])],
  controllers: [SaidaController],
  providers: [SaidaService]
})
export class SaidaModule {}
