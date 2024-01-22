import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Raw, Repository } from 'typeorm';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { Abastecimento } from './entities/abastecimento.entity';
import * as moment from 'moment';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class AbastecimentoService {
  constructor(
    @InjectRepository(Abastecimento)
    private readonly repository: Repository<Abastecimento>,
  ) {}

  create(
    createAbastecimentoDto: CreateAbastecimentoDto,
  ): Promise<Abastecimento> {
    const abastecimento = this.repository.create(createAbastecimentoDto);
    return this.repository.save(abastecimento);
  }

  async findAbastecimentoByDate(
    date: Date,
    text: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Abastecimento>> {
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

  async paginate(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Abastecimento>> {
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

  async findAbastecimentoByFuncionario(
    id: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Abastecimento>> {
    const now = new Date();
    const queryBuilder = this.repository.createQueryBuilder('abastecimento');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('abastecimento.combustivel', 'combustivel');
    queryBuilder.leftJoinAndSelect('abastecimento.veiculo', 'veiculo');
    queryBuilder.leftJoinAndSelect('veiculo.autorizacao', 'autorizacao');
    queryBuilder
      .where('autorizacao.funcionario.id = :id', { id })
      .andWhere('DATE(abastecimento.created_At) = :now', { now });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Abastecimento[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Abastecimento> {
    return this.repository.findOne({
      relations: {
        combustivel: true,
      },
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateAbastecimentoDto: UpdateAbastecimentoDto,
  ): Promise<Abastecimento> {
    const abastecimento = await this.repository.preload({
      id: id,
      ...updateAbastecimentoDto,
    });
    if (!abastecimento) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(abastecimento);
  }

  async updateByUser(
    id: string,
    updateAbastecimentoDto: UpdateAbastecimentoDto,
  ): Promise<Abastecimento> {
    const abastecimento = await this.repository.preload({
      id: id,
      ...updateAbastecimentoDto,
    });
    const now = new Date();
    let formatedDate = moment(now).format('YYYY-MM-DD');

    if (!abastecimento) {
      throw new NotFoundException(`Item ${id} not found`);
    } else {
      if (abastecimento.createdAt === formatedDate) {
        return this.repository.save(abastecimento);
      } else {
        throw new NotAcceptableException(
          `Não é permitido atualizar mais esse abastecimento.`,
        );
      }
    }
  }

  async remove(id: string) {
    const abastecimento = await this.findOne(id);
    return this.repository.remove(abastecimento);
  }

  async removeByFuncionario(id: string) {
    const abastecimento = await this.findOne(id);
    const now = new Date();
    let formatedDate = moment(now).format('YYYY-MM-DD');

    if (!abastecimento) {
      throw new NotFoundException(`Item ${id} not found`);
    } else {
      if (abastecimento.createdAt === formatedDate) {
        return this.repository.remove(abastecimento);
      } else {
        throw new NotAcceptableException(
          `Não é permitido remover mais esse abastecimento.`,
        );
      }
    }
  }
}
