import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('unidade')
@JwtAuth()
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUnidadeDto: CreateUnidadeDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.unidadeService.create(createUnidadeDto);
    res.set('location', '/unidade/' + data.id);
    return data;
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.unidadeService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.unidadeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto) {
    return this.unidadeService.update(id, updateUnidadeDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.unidadeService.remove(id);
  }
}
