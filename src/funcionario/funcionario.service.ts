import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(@InjectRepository(Funcionario) private readonly repository: Repository<Funcionario>) {}
  
  create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const funcionario = this.repository.create(createFuncionarioDto);
    return this.repository.save(funcionario);
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
