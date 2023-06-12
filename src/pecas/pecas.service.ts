import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { Peca } from './entities/peca.entity';

@Injectable()
export class PecasService {
  constructor(@InjectRepository(Peca) private readonly repository: Repository<Peca>) {}

  create(createPecaDto: CreatePecaDto) {
    const peca = this.repository.create(createPecaDto);
    return this.repository.save(peca);
  }

  findPecaByName(text: string): Promise<Peca[]> {
    return this.repository.find({
      relations: {
        fornecedorP: true
      },
      where: [
        { nomePeca: Like(`%${text}%`) },
        { descricao: Like(`%${text}%`) },
        { codPeca: Like(`%${text}%`) },
        { fornecedorP: {
          nome: Like(`%${text}%`)
        } }
      ]
    })
  }

  findAll(): Promise<Peca[]> {
    return this.repository.find({ relations: ['veiculo'] });
  }

  findOne(id: string): Promise<Peca> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updatePecaDto: UpdatePecaDto): Promise<Peca> {
    const peca = await this.repository.preload ({
      id: id,
      ...updatePecaDto,
    })
    if (!peca) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(peca);
  }

  async remove(id: string) {
    const peca = await this.findOne(id);
    return this.repository.remove(peca);
  }
}
