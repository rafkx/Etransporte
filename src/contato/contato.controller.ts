import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';

@Controller('contato')
@JwtAuth()
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createContatoDto: CreateContatoDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.contatoService.create(createContatoDto);
    res.set('location', '/contato/' + data.id);
    return this.contatoService.create(createContatoDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.contatoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.contatoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateContatoDto: UpdateContatoDto) {
    return this.contatoService.update(id, updateContatoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.contatoService.remove(id);
  }
}
