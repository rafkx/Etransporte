import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Raw } from 'typeorm';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Quilometro } from './entities/quilometro.entity';
import * as moment from 'moment';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class QuilometroService {
  constructor(
    @InjectRepository(Quilometro)
    private readonly repository: Repository<Quilometro>,
  ) {}

  create(createQuilometroDto: CreateQuilometroDto): Promise<Quilometro> {
    const quilometro = this.repository.create(createQuilometroDto);
    return this.repository.save(quilometro);
  }

  async findKmByDate(
    date: Date,
    text: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Quilometro>> {
    const queryBuilder = this.repository.createQueryBuilder('quilometro');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('quilometro.veiculo', 'veiculo');

    if (date && text) {
      queryBuilder.where('veiculo.placa LIKE :text', { text: `%${text}%` });
      queryBuilder.andWhere('DATE(quilometro.data) = :date', { date });
    }

    if (date) {
      queryBuilder.where('DATE(quilometro.data) = :date', { date });
    }

    if (text) {
      queryBuilder.where('veiculo.placa LIKE :text', { text: `%${text}%` });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Quilometro>> {
    const queryBuilder = this.repository.createQueryBuilder('quilometro');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('quilometro.veiculo', 'veiculo');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findQuilometroByFuncionario(
    id: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Quilometro>> {
    const now = new Date();
    const queryBuilder = this.repository.createQueryBuilder('quilometro');
    queryBuilder.leftJoinAndSelect('quilometro.veiculo', 'veiculo');
    queryBuilder.leftJoinAndSelect('veiculo.autorizacao', 'autorizacao');
    queryBuilder
      .where('autorizacao.funcionario.id = :id', { id })
      .andWhere('DATE(quilometro.created_At) = :now', { now });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Quilometro[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Quilometro> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: string,
    updateQuilometroDto: UpdateQuilometroDto,
  ): Promise<Quilometro> {
    const quilometro = await this.repository.preload({
      id: id,
      ...updateQuilometroDto,
    });
    if (!quilometro) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(quilometro);
  }

  async updateByUser(
    id: string,
    updateQuilometroDto: UpdateQuilometroDto,
  ): Promise<Quilometro> {
    const quilometro = await this.repository.preload({
      id: id,
      ...updateQuilometroDto,
    });
    const now = new Date();
    let formatedDate = moment(now).format('YYYY-MM-DD');

    if (!quilometro) {
      throw new NotFoundException(`Item ${id} not found`);
    } else {
      if (quilometro.createdAt === formatedDate) {
        return this.repository.save(quilometro);
      } else {
        throw new NotAcceptableException(
          `Não é permitido atualizar mais essa quilometragem.`,
        );
      }
    }
  }

  async remove(id: string) {
    const quilometro = await this.findOne(id);
    return this.repository.remove(quilometro);
  }

  async removeByFuncionario(id: string) {
    const quilometro = await this.findOne(id);
    const now = new Date();
    let formatedDate = moment(now).format('YYYY-MM-DD');

    if (!quilometro) {
      throw new NotFoundException(`Item ${id} not found`);
    } else {
      if (quilometro.createdAt === formatedDate) {
        return this.repository.remove(quilometro);
      } else {
        throw new NotAcceptableException(
          `Não é permitido remover mais essa quilometragem.`,
        );
      }
    }
  }
}
