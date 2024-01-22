import { Module } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { ContatoController } from './contato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contato } from './entities/contato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contato])],
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}
