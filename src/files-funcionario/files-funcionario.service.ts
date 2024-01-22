import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFilesFuncionarioDto } from './dto/create-files-funcionario.dto';
import { UpdateFilesFuncionarioDto } from './dto/update-files-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesFuncionario } from './entities/files-funcionario.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import { catchError } from 'rxjs';
import { join } from 'path';

@Injectable()
export class FilesFuncionarioService {
  constructor(
    @InjectRepository(FilesFuncionario)
    private readonly repository: Repository<FilesFuncionario>,
  ) {}

  async salvarDados(
    files: Express.Multer.File[],
    createFilesFuncionarioDto: CreateFilesFuncionarioDto,
    req: Request,
  ): Promise<any> {
    try {
      const arrayArquivos = files?.map((file) => {
        const arquivo = new FilesFuncionario();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files-funcionario/${
          file.filename
        }`;
        arquivo.funcionario = createFilesFuncionarioDto?.funcionario;
        return arquivo;
      });
      await this.repository.save(arrayArquivos);
      return { success: true };
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(
      join(process.cwd(), `./files/funcionario/${fileName}`),
    );
    return new StreamableFile(file);
  }

  findAll(id: string): Promise<FilesFuncionario[]> {
    const queryBuilder =
      this.repository.createQueryBuilder('files_funcionario');
    queryBuilder.leftJoinAndSelect(
      'files_funcionario.funcionario',
      'funcionario',
    );
    queryBuilder.where('funcionario.id = :id', { id });
    return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`./files/funcionario/${fileName}`, (erro) => {
      if (erro) {
        console.error(erro);
        return erro;
      }
    });
    const queryBuilder = this.repository
      .createQueryBuilder('files_funcionario')
      .delete()
      .from('files_funcionario')
      .where('files_funcionario.file_name = :fileName', { fileName })
      .execute();
    return queryBuilder;
  }
}
