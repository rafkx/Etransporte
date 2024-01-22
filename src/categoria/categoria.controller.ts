import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
@JwtAuth()
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() createCategoriaDto: CreateCategoriaDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.categoriaService.create(createCategoriaDto);
    res.set('location', '/categoria/' + data.id);
    return data;
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(id);
  }
}
