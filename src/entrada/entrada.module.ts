import { Module } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from './entities/entrada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrada])],
  controllers: [EntradaController],
  providers: [EntradaService]
})
export class EntradaModule {}
