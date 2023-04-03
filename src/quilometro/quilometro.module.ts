import { Module } from '@nestjs/common';
import { QuilometroService } from './quilometro.service';
import { QuilometroController } from './quilometro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quilometro } from './entities/quilometro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quilometro])],
  controllers: [QuilometroController],
  providers: [QuilometroService]
})
export class QuilometroModule {}
