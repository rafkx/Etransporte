import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWeb } from './entities/userWeb.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserWeb) private readonly repository: Repository<UserWeb>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find({ select: ['id', 'name', 'email', 'role'] });
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({id});
  }

  async findOneOrFail(options: FindOneOptions<UserWeb>): Promise<UserWeb>{
    try {
      return await this.repository.findOneOrFail(options);
    } catch (error){
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user){
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
