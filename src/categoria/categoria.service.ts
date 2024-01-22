import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.repository.create(createCategoriaDto);
    return this.repository.save(categoria);
  }

  findAll(): Promise<Categoria[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Categoria> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.repository.preload({
      id: id,
      ...updateCategoriaDto,
    });
    if (!categoria) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(categoria);
  }

  async remove(id: string) {
    const categoria = await this.findOne(id);
    return this.repository.remove(categoria);
  }
}
