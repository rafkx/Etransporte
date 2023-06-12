import { Module } from '@nestjs/common';
import { FilesPecaService } from './files-peca.service';
import { FilesPecaController } from './files-peca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesPeca } from './entities/files-peca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesPeca])],
  controllers: [FilesPecaController],
  providers: [FilesPecaService]
})
export class FilesPecaModule {}
