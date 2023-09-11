import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFilesServicoDto } from './dto/create-files-servico.dto';
import { UpdateFilesServicoDto } from './dto/update-files-servico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesServico } from './entities/files-servico.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesServicoService {
  constructor(@InjectRepository(FilesServico) private readonly repository: Repository<FilesServico>) { }

  async salvarDados(
    files: Express.Multer.File[],
    createFilesServicoDto: CreateFilesServicoDto,
    req: Request): Promise<any> {
      try {
        const arrayArquivos = files?.map((file) => {
        const arquivo = new FilesServico();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files-servico/${file.filename}`;
        arquivo.servico = createFilesServicoDto?.servico;
        return arquivo;
        });
        await this.repository.save(arrayArquivos);
        return {success: true};
      } catch (e) {
        return {success: false, message: e.message};
      }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(join(process.cwd(), `./files/servico/${fileName}`));
    return new StreamableFile(file);
  }

  findAll(id: string) {
    const queryBuilder = this.repository.createQueryBuilder('files_servico');
    queryBuilder.leftJoinAndSelect('files_servico.servico', 'servico');
    queryBuilder.where('servico.id = :id', { id: id });
    return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`./files/servico/${fileName}`, (erro) => {
      if (erro) {
        console.log(erro);
        return erro;
      }
    });
    const queryBuilder = this.repository.createQueryBuilder('files_servico')
    .delete()
    .from('files_servico')
    .where('files_servico.file_name = :fileName', {fileName})
    .execute();
    return queryBuilder;
  }
}
