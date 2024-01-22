import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manutencao } from './entities/manutencao.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class ManutencaoService {
  constructor(
    @InjectRepository(Manutencao)
    private readonly repository: Repository<Manutencao>,
  ) {}

  create(createManutencaoDto: CreateManutencaoDto) {
    const manutencao = this.repository.create(createManutencaoDto);
    return this.repository.save(manutencao);
  }

  async findManutencaoByDate(
    date: Date,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Manutencao>> {
    const queryBuilder = this.repository.createQueryBuilder('manutencao');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('manutencao.veiculo', 'veiculo');
    queryBuilder.where('DATE(manutencao.data) = :date', { date });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Manutencao>> {
    const queryBuilder = this.repository.createQueryBuilder('manutencao');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.leftJoinAndSelect('manutencao.veiculo', 'veiculo');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Manutencao[]> {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: string,
    updateManutencaoDto: UpdateManutencaoDto,
  ): Promise<Manutencao> {
    const manutencao = await this.repository.preload({
      id: id,
      ...updateManutencaoDto,
    });

    if (!manutencao) {
      throw new NotFoundException(`Item ${id} not found`);
    }

    return this.repository.save(manutencao);
  }

  async remove(id: string) {
    const manutencao = await this.findOne(id);
    return this.repository.remove(manutencao);
  }
}
