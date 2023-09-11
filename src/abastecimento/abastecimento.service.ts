import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Raw, Repository } from 'typeorm';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { Abastecimento } from './entities/abastecimento.entity';
import { IPaginationMeta, IPaginationOptions, Pagination, paginate, paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { query } from 'express';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class AbastecimentoService {
  constructor(@InjectRepository(Abastecimento) private readonly repository: Repository<Abastecimento>) {}

  create(createAbastecimentoDto: CreateAbastecimentoDto): Promise<Abastecimento> {
    const abastecimento = this.repository.create(createAbastecimentoDto);
    return this.repository.save(abastecimento);
  }

  async findAbastecimentoByDate(date: Date, text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Abastecimento>> { 
    const queryBuilder = this.repository.createQueryBuilder('abastecimento');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('abastecimento.veiculo', 'veiculo');
    
    if (date && text) {
      queryBuilder.where('veiculo.placa LIKE :text', { text: `%${text}%` });
      queryBuilder.andWhere('DATE(abastecimento.data) = :date', { date });
    }

    if (date) {
      queryBuilder.where('DATE(abastecimento.data) = :date', { date });
    }

    if (text) {
      queryBuilder.where('veiculo.placa LIKE :text', { text: `%${text}%` });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Abastecimento>> {
    const queryBuilder = this.repository.createQueryBuilder('abastecimento');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('abastecimento.veiculo', 'veiculo');
    queryBuilder.leftJoinAndSelect('abastecimento.km', 'km');
    queryBuilder.leftJoinAndSelect('abastecimento.combustivel', 'combustivel');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
