import { Module } from '@nestjs/common';
import { AbastecimentoService } from './abastecimento.service';
import { AbastecimentoController } from './abastecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abastecimento } from './entities/abastecimento.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Abastecimento]),
   // MulterModule.register({ dest: './uploads' })
  ],
  controllers: [AbastecimentoController],
  providers: [AbastecimentoService]
})
export class AbastecimentoModule {}
