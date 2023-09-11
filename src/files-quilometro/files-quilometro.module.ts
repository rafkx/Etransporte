import { Module } from '@nestjs/common';
import { FilesQuilometroService } from './files-quilometro.service';
import { FilesQuilometroController } from './files-quilometro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesQuilometro } from './entities/files-quilometro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesQuilometro])],
  controllers: [FilesQuilometroController],
  providers: [FilesQuilometroService]
})
export class FilesQuilometroModule {}
