import { Injectable } from '@nestjs/common';
import { CreateFilesPecaDto } from './dto/create-files-peca.dto';
import { UpdateFilesPecaDto } from './dto/update-files-peca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesPeca } from './entities/files-peca.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FilesPecaService {
  constructor(@InjectRepository(FilesPeca) private readonly repository: Repository<FilesPeca>) { }

  async salvarDados(files: Express.Multer.File[], req: Request) {
    const arrayArquivos = files.map((file) => {
      const arquivo = new FilesPeca();
      arquivo.fileName = file.filename;
      arquivo.contentLenght = file.size;
      arquivo.contentType = file.mimetype;
      arquivo.url = `${req.protocol}://${req.get('host')}/files-peca/${file.filename}`;
      return arquivo;
    });

    return await this.repository.save(arrayArquivos);
  }

  create(createFilesPecaDto: CreateFilesPecaDto) {
    return 'This action adds a new filesPeca';
  }

  findAll() {
    return `This action returns all filesPeca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filesPeca`;
  }

  update(id: number, updateFilesPecaDto: UpdateFilesPecaDto) {
    return `This action updates a #${id} filesPeca`;
  }

  remove(id: number) {
    return `This action removes a #${id} filesPeca`;
  }
}
