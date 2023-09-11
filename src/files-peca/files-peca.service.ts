import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFilesPecaDto } from './dto/create-files-peca.dto';
import { UpdateFilesPecaDto } from './dto/update-files-peca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesPeca } from './entities/files-peca.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesPecaService {
  constructor(@InjectRepository(FilesPeca) private readonly repository: Repository<FilesPeca>) { }

  async salvarDados(
    files: Express.Multer.File[],
    createFilesPecaDto: CreateFilesPecaDto,
    req: Request): Promise<any> {
      try {
        const arrayArquivos = files?.map((file) => {
        const arquivo = new FilesPeca();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files-peca/${file.filename}`;
        arquivo.peca = createFilesPecaDto?.peca;
        return arquivo;
        });
        await this.repository.save(arrayArquivos);
        return {success: true};
      } catch (e) {
        return {sucess: false, message: e.message};
      }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(join(process.cwd(), `./files/peca/${fileName}`));
    return new StreamableFile(file);
  }

  findAll(id: string): Promise<FilesPeca[]> {
    const queryBuilder = this.repository.createQueryBuilder('files_peca');
    queryBuilder.leftJoinAndSelect('files_peca.peca', 'peca');
    queryBuilder.where('peca.id = :id', { id: id });
    return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`./files/peca/${fileName}`, (erro) => {
      if (erro) {
        console.log(erro);
        return erro;
      }
    });
    const queryBuilder = this.repository.createQueryBuilder('files_pecas')
    .delete()
    .from('files_peca')
    .where('files_peca.file_name = :fileName', {fileName})
    .execute();
    return queryBuilder;
  }
}
