import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';
import { IPaginationLinks, IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';

@Injectable()
export class FuncionarioService {
  constructor(@InjectRepository(Funcionario) private readonly repository: Repository<Funcionario>) {}
  
  create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const funcionario = this.repository.create(createFuncionarioDto);
    return this.repository.save(funcionario);
  }

  async search(text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Funcionario>> { 
    const queryBuilder = this.repository.createQueryBuilder('funcionario');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);

    if (text) {
      queryBuilder.where('funcionario.nomeFun LIKE :text', { text: `%${text}%`})
      .orWhere('funcionario.cpf LIKE :text', { text: `%${text}%`})
      .orWhere('funcionario.funcao LIKE :text', { text: `%${text}%`})
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<Funcionario>> {
    const queryBuilder = this.repository.createQueryBuilder('funcionario');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<Funcionario[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Funcionario> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
    const funcionario = await this.repository.preload({
      id: id,
      ...updateFuncionarioDto,
    });
    if (!funcionario){
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(funcionario);
  }

  async remove(id: string) {
    const funcionario = await this.findOne(id);
    return this.repository.remove(funcionario);
  }
}
