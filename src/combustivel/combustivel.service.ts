import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCombustivelDto } from './dto/create-combustivel.dto';
import { UpdateCombustivelDto } from './dto/update-combustivel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Combustivel } from './entities/combustivel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CombustivelService {
  constructor(@InjectRepository(Combustivel) private readonly repository: Repository<Combustivel>) { }
  
  create(createCombustivelDto: CreateCombustivelDto): Promise<Combustivel> {
    const combustivel = this.repository.create(createCombustivelDto);
    return this.repository.save(combustivel);
  }

  findAll(): Promise<Combustivel[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Combustivel> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateCombustivelDto: UpdateCombustivelDto): Promise<Combustivel> {
    const combustivel = await this.repository.preload({
      id: id,
      ...updateCombustivelDto,
    });
    if (!combustivel) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(combustivel);
  }

  async remove(id: string) {
    const combustivel = await this.findOne(id);
    return this.repository.remove(combustivel);
  }
}
