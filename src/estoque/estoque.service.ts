import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Estoque } from './entities/estoque.entity';

@Injectable()
export class EstoqueService {
  constructor(@InjectRepository(Estoque) private readonly repository: Repository<Estoque>) {}
  
  create(createEstoqueDto: CreateEstoqueDto) {
    const estoque = this.repository.create(createEstoqueDto);
    return this.repository.save(estoque);
  }

  findAll(): Promise<Estoque[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Estoque> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateEstoqueDto: UpdateEstoqueDto): Promise<Estoque> {
    const estoque = await this.repository.preload({
      id: id,
      ...updateEstoqueDto,
    });
    if (!estoque) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(estoque);
  }

  async remove(id: string) {
    const estoque = await this.findOne(id);
    return this.repository.remove(estoque);
  }
}
