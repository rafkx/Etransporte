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

  findServico(text: string): Promise<Servico[]>{
    return this.repository.find({
      relations: {
        fornecedor: true,
        veiculo: true,
      },
      where: [
        { descricao: Like(`%${text}%`) },
        { cod: Like(`%${text}%`) },
        { veiculo: {
          modelo: Like(`%${text}%`)
        } },
        { fornecedor: {
          nome: Like(`%${text}%`)
          } },
      ],
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
