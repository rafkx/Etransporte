import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Raw } from 'typeorm';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Quilometro } from './entities/quilometro.entity';

@Injectable()
export class QuilometroService {
  constructor(@InjectRepository(Quilometro) private readonly repository: Repository<Quilometro>) {}

  create(createQuilometroDto: CreateQuilometroDto): Promise<Quilometro> {
    const quilometro = this.repository.create(createQuilometroDto)
    return this.repository.save(quilometro);
  }

  findKmByDate(date: Date, text: string): Promise<Quilometro[]> {
    const queryBuilder = this.repository.createQueryBuilder('quilometro');
    queryBuilder.leftJoinAndSelect('quilometro.veiculo', 'veiculo');
    if (date) {
      queryBuilder.andWhere('DATE(quilometro.data) = :date', { date });
    }

    if (text) {
      queryBuilder.andWhere('veiculo.placa LIKE :text', { text: `%${text}%` })
    }
    return queryBuilder.getMany();
  }

  findAll(): Promise<Quilometro[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Quilometro> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateQuilometroDto: UpdateQuilometroDto): Promise<Quilometro> {
    const quilometro = await this.repository.preload({
      id: id,
      ...updateQuilometroDto,
    });
    if (!quilometro){
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(quilometro);
  }

  async remove(id: string) {
    const quilometro = await this.findOne(id)
    return this.repository.remove(quilometro);
  }
}
