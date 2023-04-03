import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Servico } from './entities/servico.entity';

@Injectable()
export class ServicoService {
  constructor(@InjectRepository(Servico) private readonly repository: Repository<Servico>) {}

  async create(createServicoDto: CreateServicoDto) {
    const servico = this.repository.create(createServicoDto);
    return await this.repository.save(servico);
  }

  findServicoByFornecedor(nome: string): Promise<Servico[]>{
    return this.repository.find({
      relations: {
        fornecedor: true
      },
      where: {
        fornecedor: {
          nome: Like(`%${nome}%`)
        },
      },
    })
  }

  async findAll() {
    return await this.repository.find({ relations: ['veiculo'] });
  }

  findOne(id: string) {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateServicoDto: UpdateServicoDto) {
    const servico = await this.repository.preload({
      id: id,
      ...updateServicoDto,
    });
    if (!servico) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(servico);
  }

  async remove(id: string) {
    const servico = await this.findOne(id);
    return this.repository.remove(servico);
  }
}
