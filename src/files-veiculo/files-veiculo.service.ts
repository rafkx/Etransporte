import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { CreateFilesVeiculoDto } from './dto/create-files-veiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesVeiculo } from './entities/files-veiculo.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesVeiculoService {
  constructor(
    @InjectRepository(FilesVeiculo)
    private readonly repository: Repository<FilesVeiculo>,
  ) {}

  async salvarDados(
    files: Express.Multer.File[],
    createFilesVeiculoDto: CreateFilesVeiculoDto,
    req: Request,
  ): Promise<any> {
    try {
      const arrayArquivos = files?.map((file) => {
        const arquivo = new FilesVeiculo();
        arquivo.fileName = file.filename;
        arquivo.contentLenght = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files-servico/${
          file.filename
        }`;
        arquivo.veiculo = createFilesVeiculoDto?.veiculo;
        return arquivo;
      });
      console.log(arrayArquivos);
      await this.repository.save(arrayArquivos);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  download(fileName: string): StreamableFile {
    const file = fs.createReadStream(
      join(process.cwd(), `./files/veiculo/${fileName}`),
    );
    return new StreamableFile(file);
  }

  findAll(id: string) {
    const queryBuilder = this.repository.createQueryBuilder('files_veiculo');
    queryBuilder.leftJoinAndSelect('files_veiculo.veiculo', 'veiculo');
    queryBuilder.where('veiculo.id = :id', { id: id });
    return queryBuilder.getMany();
  }

  async remove(fileName: string) {
    await fs.unlink(`./files/veiculo/${fileName}`, (erro) => {
      if (erro) {
        console.log(erro);
        return erro;
      }
    });
    const queryBuilder = this.repository
      .createQueryBuilder('files_veiculo')
      .delete()
      .from('files_veiculo')
      .where('files_veiculo.file_name = :fileName', { fileName })
      .execute();
    return queryBuilder;
  }
}
