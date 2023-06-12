import { Injectable } from '@nestjs/common';
import { CreateFilesAbastecimentoDto } from './dto/create-files-abastecimento.dto';
import { UpdateFilesAbastecimentoDto } from './dto/update-files-abastecimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesAbastecimento } from './entities/files-abastecimento.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FilesAbastecimentoService {
  constructor(@InjectRepository(FilesAbastecimento) private readonly repository: Repository<FilesAbastecimento>) { }

  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new FilesAbastecimento();
    arquivo.fileName = file.filename;
    arquivo.contentLenght = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/abastecimento/${file.filename}`;

    return await this.repository.save(arquivo);
  }

  create(createFilesAbastecimentoDto: CreateFilesAbastecimentoDto) {
    return 'This action adds a new filesAbastecimento';
  }

  findAll() {
    return `This action returns all filesAbastecimento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filesAbastecimento`;
  }

  update(id: number, updateFilesAbastecimentoDto: UpdateFilesAbastecimentoDto) {
    return `This action updates a #${id} filesAbastecimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} filesAbastecimento`;
  }
}
