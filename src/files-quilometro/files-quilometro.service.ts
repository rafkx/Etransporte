import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFilesQuilometroDto } from './dto/create-files-quilometro.dto';
import { UpdateFilesQuilometroDto } from './dto/update-files-quilometro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesQuilometro } from './entities/files-quilometro.entity';
import { Repository } from 'typeorm';
import { Request, query } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesQuilometroService {
  constructor(@InjectRepository(FilesQuilometro) private readonly repository: Repository<FilesQuilometro>) { }

  async salvarDados(
    file: Express.Multer.File,
    createFilesQuilometroDto: CreateFilesQuilometroDto,
    req: Request,
    ): Promise<any> {
      try {
        const arquivo = new FilesQuilometro();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files-quilometro/${file.filename}`;
        arquivo.quilometro = createFilesQuilometroDto?.quilometro;
        await this.repository.save(arquivo);
        return {success: true};
      } catch (e) {
        return {success: false, message: e.message};
      }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(join(process.cwd(), `./files/quilometro/${fileName}`));
    return new StreamableFile(file);
  }

  findAll(id: string): Promise<FilesQuilometro[]> {
    const queryBuilder = this.repository.createQueryBuilder('files_quilometro');
    queryBuilder.leftJoinAndSelect('files_quilometro.quilometro', 'quilometro');
    queryBuilder.where('quilometro.id = :id', { id: id });
    return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`.files/quilometro/${fileName}`, (erro) => {
      if (erro) {
        console.log(erro)
        return erro;
      }
    });
    const queryBuilder = this.repository.createQueryBuilder('files_quilometro')
    .delete()
    .from('files_quilometro')
    .where('files_quilometro.file_name = :fileName', {fileName})
    .execute();
    return queryBuilder;
  }
}
