import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Response } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Fornecedor } from './entities/fornecedor.entity';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('fornecedor')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  @Roles(Role.Admin, Role.Gerente)
  async create(
    @Body() createFornecedorDto: CreateFornecedorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.fornecedorService.create(createFornecedorDto);
    res.set('location', '/fornecedor/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(@Query('text') text: string, @Query() pageOptionsDto: PageOptionsDto) {
    return this.fornecedorService.search(text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.fornecedorService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.fornecedorService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Gerente)
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Gerente)
  remove(@Param('id') id: string) {
    return this.fornecedorService.remove(id);
  }
}
