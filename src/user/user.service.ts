import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync, compare } from 'bcrypt';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWeb } from './entities/userWeb.entity';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { PageDto } from 'src/DTOs/page.dto';
import { PageMetaDto } from 'src/DTOs/page-meta.dto';
import { Hash } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserWeb) private readonly repository: Repository<UserWeb>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async findUsername(text: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<UserWeb>> {
    const queryBuilder = this.repository.createQueryBuilder('user_web')
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.select('user_web.id')
    .addSelect('user_web.name')
    .addSelect('user_web.email')
    .addSelect('user_web.role');

    if (text) {
      queryBuilder.where('user_web.name LIKE :text', { text: `%${text}%` })
      .orWhere('user_web.email LIKE :text', { text: `%${text}%` })
      .orWhere('user_web.role LIKE :text', { text: `%${text}%` })
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto);
  }

  async paginate(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserWeb>> {
    const queryBuilder = this.repository.createQueryBuilder('user_web');
    queryBuilder.skip(pageOptionsDto.skip);
    queryBuilder.take(pageOptionsDto.take);
    queryBuilder.select('user_web.id')
    .addSelect('user_web.name')
    .addSelect('user_web.email')
    .addSelect('user_web.role');
    
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findAll(): Promise<UserWeb[]> {
    return this.repository.find();
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

  async update(email: string, updateUserDto: UpdateUserDto): Promise<UserWeb> {
    const user = await this.findOneOrFail({ where: { email: email }});

    const passwordHashed = await hashSync(updateUserDto.newPassword, 10);

    const isMatch = await compare(updateUserDto.lastPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Senha antiga inválida!');
    }

    return this.repository.save({
      ...user,
      password: passwordHashed,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
