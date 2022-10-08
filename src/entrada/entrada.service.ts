import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { Entrada } from './entities/entrada.entity';

@Injectable()
export class EntradaService {
  constructor(@InjectRepository(Entrada) private readonly repository: Repository<Entrada>) {}

  create(createEntradaDto: CreateEntradaDto) {
    const entrada = this.repository.create(createEntradaDto);
    return this.repository.save(entrada);
  }

  findAll(): Promise<Entrada[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Entrada> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateEntradaDto: UpdateEntradaDto): Promise<Entrada> {
    const entrada = await this.repository.preload({
      id: id,
      ...updateEntradaDto,
    });
    if (!entrada) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(entrada);
  }

  async remove(id: string) {
    const entrada = await this.findOne(id);
    return this.repository.remove(entrada);
  }
}
