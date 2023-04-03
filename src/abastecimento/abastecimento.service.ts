import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { Abastecimento } from './entities/abastecimento.entity';

@Injectable()
export class AbastecimentoService {
  constructor(@InjectRepository(Abastecimento) private readonly repository: Repository<Abastecimento>) {}

  create(createAbastecimentoDto: CreateAbastecimentoDto): Promise<Abastecimento> {
    const abastecimento = this.repository.create(createAbastecimentoDto);
    return this.repository.save(abastecimento);
  }

  findAbastecimentoByDate(abastecimento: Partial<Abastecimento>): Promise<Abastecimento[]> {
    return this.repository.findBy(
      { data: Raw((alias) => `${alias} = :date`, { date: abastecimento.data }) }
    )
  }

  findAll(): Promise<Abastecimento[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Abastecimento> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateAbastecimentoDto: UpdateAbastecimentoDto): Promise<Abastecimento> {
    const abastecimento = await this.repository.preload({
      id: id,
      ...updateAbastecimentoDto,
    });
    if (!abastecimento) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(abastecimento);
  }

  async remove(id: string) {
    const abastecimento = await this.findOne(id);
    return this.repository.remove(abastecimento);
  }
}
