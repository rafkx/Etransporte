import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from './entities/fornecedor.entity';

@Injectable()
export class FornecedorService {
  constructor(@InjectRepository(Fornecedor) private readonly repository: Repository<Fornecedor>) {}

  create(createFornecedorDto: CreateFornecedorDto) {
    const fornecedor = this.repository.create(createFornecedorDto);
    return this.repository.save(fornecedor);
    
  }

  findAll(): Promise<Fornecedor[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Fornecedor> {
    return this.repository.findOneBy({id});
  }

  async update(id: string, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = await this.repository.preload({
      id: id,
      ...updateFornecedorDto,
    });
    if (!fornecedor){
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(fornecedor);
  }

  async remove(id: string) {
    const fornecedor = await this.findOne(id);
    return this.repository.remove(fornecedor);
  }
}
