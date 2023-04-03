import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';

@Injectable()
export class UnidadeService {
  constructor(@InjectRepository(Unidade) private readonly repository: Repository<Unidade>) {}

  create(createUnidadeDto: CreateUnidadeDto) {
    const unidade = this.repository.create(createUnidadeDto);
    return this.repository.save(unidade);
  }

  findAll(): Promise<Unidade[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Unidade> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateUnidadeDto: UpdateUnidadeDto): Promise<Unidade> {
    const unidade = await this.repository.preload({
      id: id,
      ...updateUnidadeDto,
    });
    if (!unidade) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(unidade);
  }

  async remove(id: string) {
    const unidade = await this.findOne(id);
    return this.repository.remove(unidade);
  }
}
