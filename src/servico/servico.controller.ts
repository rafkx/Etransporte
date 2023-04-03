import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('servico')
@JwtAuth()
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createServicoDto: CreateServicoDto, @Res({ passthrough: true }) res: Response ) {
    const data = await this.servicoService.create(createServicoDto);
    res.set('location', '/servico/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(@Query('nome') nome: string){
    return this.servicoService.findServicoByFornecedor(nome)
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.servicoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicoService.update(id, updateServicoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.servicoService.remove(id);
  }
}
