import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iten } from './entities/iten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Iten])],
  controllers: [ItensController],
  providers: [ItensService]
})
export class ItensModule {}
