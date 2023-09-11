import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateFilesAbastecimentoDto } from './dto/create-files-abastecimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesAbastecimento } from './entities/files-abastecimento.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesAbastecimentoService {
  constructor(@InjectRepository(FilesAbastecimento) private readonly repository: Repository<FilesAbastecimento>) { }

  async salvarDados(
    file: Express.Multer.File,
    createFileAbastecimentoDto: CreateFilesAbastecimentoDto,
    req: Request): Promise<any> {
      try {
        const arquivo = new FilesAbastecimento();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files/abastecimento/${file.filename}`;
        arquivo.abastecimento = createFileAbastecimentoDto?.abastecimento;
        await this.repository.save(arquivo);
        return {success: true};
      } catch (e) {
        return {success: false, message: e.message}
      }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(join(process.cwd(), `./files/abastecimento/${fileName}`));
    return new StreamableFile(file);
  }

  findAll(id: string): Promise<FilesAbastecimento[]> {
   const queryBuilder = this.repository.createQueryBuilder('files_abastecimento');
   queryBuilder.leftJoinAndSelect('files_abastecimento.abastecimento', 'abastecimento');
   queryBuilder.where('abastecimento.id = :id', { id: id });
   return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`./files/abastecimento/${fileName}`, (erro) => {
      if (erro) {
        console.error(erro);
        return erro;
      }
    });
    const queryBuilder = this.repository.createQueryBuilder('files_abastecimento')
    .delete()
    .from('files_abastecimento')
    .where('files_abastecimento.file_name = :fileName', {fileName})
    .execute();
    return queryBuilder;
  }
}
