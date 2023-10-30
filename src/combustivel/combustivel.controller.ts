import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CombustivelService } from './combustivel.service';
import { CreateCombustivelDto } from './dto/create-combustivel.dto';
import { UpdateCombustivelDto } from './dto/update-combustivel.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Response } from 'express';

@Controller('combustivel')
@JwtAuth()
export class CombustivelController {
  constructor(private readonly combustivelService: CombustivelService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createCombustivelDto: CreateCombustivelDto, @Res({ passthrough: true }) res: Response ) {
    const data = await this.combustivelService.create(createCombustivelDto);
    res.set('location', '/combustivel/' + data.id)
    return data;
  }

  @Get()
  @Roles(Role.Admin, Role.User, Role.Gerente)
  findAll() {
    return this.combustivelService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.combustivelService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCombustivelDto: UpdateCombustivelDto) {
    return this.combustivelService.update(id, updateCombustivelDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.combustivelService.remove(id);
  }
}
