import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from './entities/fornecedor.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly repository: Repository<Fornecedor>,
  ) {}

  create(createFornecedorDto: CreateFornecedorDto) {
    const fornecedor = this.repository.create(createFornecedorDto);
    return this.repository.save(fornecedor);
  }

  async search(
    text: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Fornecedor>> {
    const queryBuilder = this.repository.createQueryBuilder('fornecedor');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('fornecedor.contatos', 'contatos');

    if (text) {
      queryBuilder
        .where('fornecedor.nome LIKE :text', { text: `%${text}%` })
        .orWhere('contatos.apelido LIKE :text', { text: `%${text}%` });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Fornecedor>> {
    const queryBuilder = this.repository.createQueryBuilder('fornecedor');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('fornecedor.contatos', 'contatos');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Fornecedor[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Fornecedor> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: string,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    const fornecedor = await this.repository.preload({
      id: id,
      ...updateFornecedorDto,
    });
    if (!fornecedor) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(fornecedor);
  }

  async remove(id: string) {
    const fornecedor = await this.findOne(id);
    return this.repository.remove(fornecedor);
  }
}
