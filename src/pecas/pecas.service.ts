import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { Peca } from './entities/peca.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { PageDto } from 'src/DTOs/page.dto';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class PecasService {
  constructor(@InjectRepository(Peca) private readonly repository: Repository<Peca>) {}

  create(createPecaDto: CreatePecaDto) {
    const peca = this.repository.create(createPecaDto);
    return this.repository.save(peca);
  }

  async findPecaByName(text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Peca>> {
    const queryBuilder = this.repository.createQueryBuilder('pecas');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('pecas.fornecedorP', 'fornecedorP');

    if (text) {
      queryBuilder.where('pecas.nomePeca LIKE :text', { text: `%${text}%` })
      .orWhere('pecas.descricao LIKE :text', { text: `%${text}%` })
      .orWhere('pecas.codPeca LIKE :text', { text: `%${text}%` })
      .orWhere('fornecedorP.nome LIKE :text', { text: `%${text}%` })
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Peca>> {
    const queryBuilder = this.repository.createQueryBuilder('pecas');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('pecas.fornecedorP', 'fornecedorP');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findPecaByFuncionario(id: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Peca>> {
    const queryBuilder = this.repository.createQueryBuilder('peca');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('peca.veiculo', 'veiculo');
    queryBuilder.leftJoinAndSelect('veiculo.autorizacao', 'autorizacao');
    queryBuilder.where('autorizacao.funcionario.id = :id', { id });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Peca[]> {
    return this.repository.find();
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
