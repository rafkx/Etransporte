import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { Contato } from './entities/contato.entity';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato) private readonly repository: Repository<Contato>,
  ) {}

  create(createContatoDto: CreateContatoDto) {
    const contato = this.repository.create(createContatoDto);
    return this.repository.save(contato);
  }

  findAll(): Promise<Contato[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Contato> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: string,
    updateContatoDto: UpdateContatoDto,
  ): Promise<Contato> {
    const contato = await this.repository.preload({
      id: id,
      ...updateContatoDto,
    });
    if (!contato) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(contato);
  }

  async remove(id: string) {
    const contato = await this.findOne(id);
    return this.repository.remove(contato);
  }
}
