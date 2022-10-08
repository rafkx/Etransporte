import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItenDto } from './dto/create-iten.dto';
import { UpdateItenDto } from './dto/update-iten.dto';
import { Iten } from './entities/iten.entity';

@Injectable()
export class ItensService {
  constructor(@InjectRepository(Iten) private readonly repository: Repository<Iten>) {}

  create(createItenDto: CreateItenDto) {
    const item = this.repository.create(createItenDto);
    return this.repository.save(item);
  }

  findAll(): Promise<Iten[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Iten> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateItenDto: UpdateItenDto): Promise<Iten> {
    const item = await this.repository.preload({
      id: id,
      ...updateItenDto,
    });
    if (!item) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repository.remove(item);
  }
}
