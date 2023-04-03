import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaidaDto } from './dto/create-saida.dto';
import { UpdateSaidaDto } from './dto/update-saida.dto';
import { Saida } from './entities/saida.entity';

@Injectable()
export class SaidaService {
  constructor(@InjectRepository(Saida) private readonly repository: Repository<Saida>) {}

  create(createSaidaDto: CreateSaidaDto) {
    const saida = this.repository.create(createSaidaDto);
    return this.repository.save(saida);
  }

  findAll(): Promise<Saida[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Saida> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateSaidaDto: UpdateSaidaDto): Promise<Saida> {
    const saida = await this.repository.preload ({
      id: id,
      ...UpdateSaidaDto,
    })
    if (!saida) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(saida);
  }

  async remove(id: string) {
    const saida = await this.findOne(id);
    return this.repository.remove(saida);
  }
}
