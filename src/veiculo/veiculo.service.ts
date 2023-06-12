import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Veiculo } from './entities/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(@InjectRepository(Veiculo) private readonly repository: Repository<Veiculo>) {}
  
  create(createVeiculoDto: CreateVeiculoDto) {
    const veiculo = this.repository.create(createVeiculoDto);
    return this.repository.save(veiculo);
  }

  findVeiculoByPlaca(ano: number, text: string): Promise<Veiculo[]> {
    const queryBuilder = this.repository.createQueryBuilder('veiculo');
    
    if (ano) {
      queryBuilder.andWhere('veiculo.ano = :ano', { ano })
    }

    if (text) {
      queryBuilder.andWhere('veiculo.placa LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.marca LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.modelo LIKE :text', { text: `%${text}%` })
    }

    return queryBuilder.getMany();
  }

  findAll(): Promise<Veiculo[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Veiculo> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const veiculo = await this.repository.preload({
      id: id,
      ...updateVeiculoDto,
    });
    if (!veiculo) {
      throw new NotFoundException(`Item ${id} not found`)
    }
    return this.repository.save(veiculo);
  }

  async remove(id: string) {
    const veiculo = await this.findOne(id);
    return this.repository.remove(veiculo);
  }
}
