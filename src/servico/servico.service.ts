import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Servico } from './entities/servico.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { PageDto } from 'src/DTOs/page.dto';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class ServicoService {
  constructor(@InjectRepository(Servico) private readonly repository: Repository<Servico>) {}

  async create(createServicoDto: CreateServicoDto) {
    const servico = this.repository.create(createServicoDto);
    return await this.repository.save(servico);
  }

  async findServico(text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Servico>> {
    const queryBuilder = this.repository.createQueryBuilder('servico');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('servico.fornecedor', 'fornecedor');
    queryBuilder.leftJoinAndSelect('servico.veiculo', 'veiculo');

    if (text) {
      queryBuilder.where('servico.descricao LIKE :text', { text: `%${text}%` })
      .orWhere('servico.cod LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.modelo LIKE :text', { text: `%${text}%` })
      .orWhere('fornecedor.nome LIKE :text', { text: `%${text}%` })
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Servico>> {
    const queryBuilder = this.repository.createQueryBuilder('servico');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('servico.fornecedor', 'fornecedor');
    queryBuilder.leftJoinAndSelect('servico.veiculo', 'veiculo');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Servico[]> {
    return this.repository.find();
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
