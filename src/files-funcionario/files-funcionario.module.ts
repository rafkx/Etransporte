import { Module } from '@nestjs/common';
import { FilesFuncionarioService } from './files-funcionario.service';
import { FilesFuncionarioController } from './files-funcionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesFuncionario } from './entities/files-funcionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesFuncionario])],
  controllers: [FilesFuncionarioController],
  providers: [FilesFuncionarioService],
})
export class FilesFuncionarioModule {}
