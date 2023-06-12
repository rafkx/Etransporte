import { Module } from '@nestjs/common';
import { CombustivelService } from './combustivel.service';
import { CombustivelController } from './combustivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combustivel } from './entities/combustivel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Combustivel])
  ],
  controllers: [CombustivelController],
  providers: [CombustivelService]
})
export class CombustivelModule {}
