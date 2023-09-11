import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Veiculo } from './entities/veiculo.entity';
import { Observable, from, map } from 'rxjs';
import { IPaginationOptions, Pagination, paginate, paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class VeiculoService {
  constructor(@InjectRepository(Veiculo) private readonly repository: Repository<Veiculo>) {}
  
  create(createVeiculoDto: CreateVeiculoDto) {
    const veiculo = this.repository.create(createVeiculoDto);
    return this.repository.save(veiculo);
  }

  async findVeiculoByPlaca(ano: number, text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Veiculo>> {
    const queryBuilder = this.repository.createQueryBuilder('veiculo');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);

    if (ano && text) {
      queryBuilder.where('veiculo.ano = :ano', { ano });
      queryBuilder.andWhere('veiculo.placa LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.marca LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.modelo LIKE :text', { text: `%${text}%` });
    }
    
    if (ano) {
      queryBuilder.where('veiculo.ano = :ano', { ano });
    }

    if (text) {
      queryBuilder.where('veiculo.placa LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.marca LIKE :text', { text: `%${text}%` })
      .orWhere('veiculo.modelo LIKE :text', { text: `%${text}%` });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findVeiculoByFuncionario(id: string): Promise<Veiculo[]> {
    const queryBuilder = this.repository.createQueryBuilder('veiculo');
    queryBuilder.leftJoinAndSelect('veiculo.funcionario', 'funcionario');
    queryBuilder.where('funcionario.id = :id', { id });

    return queryBuilder.getMany();
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Veiculo>> {
    const queryBuilder = this.repository.createQueryBuilder('veiculo');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
