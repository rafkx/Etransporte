import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Raw, Repository } from 'typeorm';
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

  findAbastecimentoByDate(date: Date, text: string): Promise<Abastecimento[]> {
    const queryBuilder = this.repository.createQueryBuilder('abastecimento');
    queryBuilder.leftJoinAndSelect('abastecimento.veiculo', 'veiculo');
    if (date) {
      queryBuilder.andWhere('DATE(abastecimento.data) = :date', { date });
    }

    if (text) {
      queryBuilder.andWhere('abastecimento.tipo_combustivel LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.placa LIKE :text', { text: `%${text}%` })
    }
    
    return queryBuilder.getMany();
    
    /*if (date != null && text != null) {
      return this.repository.find({
        relations: {
          veiculo: true
        },
        where: [
          { tipoComb: Like(`%${text}%`), data: Raw((alias) => `${alias} = :date`, { date: date }) },
          { veiculo: {
              placa: Like(`%${text}%`) 
            }, data: Raw((alias) => `${alias} = :date`, { date: date })
          }
        ]
      })
    } */
    
    /*let where: FindOptionsWhere<Abastecimento>[] = [];
    
    if(text && text !== null) {
      return this.repository.find({
      relations: {
          veiculo: true
      },
      where: [
        { tipoComb: Like(`%${text}%`) },
        { veiculo: {
          placa: Like(`%${text}%`) 
        } }
      ]
      })
      where =  [
        { tipoComb: Like(`%${text}%`) },
        { veiculo: {
          placa: Like(`%${text}%`) 
        } }
      ];
    } else if (date && date !== null) {
      //return this.repository.findBy({ data: Raw((alias) => `${alias} = :date`, { date: date }) })
      where.push({ data: Raw((alias) => `${alias} = :date`, { date: date })});
    }
    return this.repository.find({
        relations: {
          veiculo: true
      },
      where
      });*/
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
