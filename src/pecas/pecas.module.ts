import { Module } from '@nestjs/common';
import { PecasService } from './pecas.service';
import { PecasController } from './pecas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peca } from './entities/peca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peca])],
  controllers: [PecasController],
  providers: [PecasService],
})
export class PecasModule {}
