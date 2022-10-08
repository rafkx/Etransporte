import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ItensService } from './itens.service';
import { CreateItenDto } from './dto/create-iten.dto';
import { UpdateItenDto } from './dto/update-iten.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('itens')
@JwtAuth()
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createItenDto: CreateItenDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.itensService.create(createItenDto);
    res.set('location', '/itens/' + data.id);
    return this.itensService.create(createItenDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.itensService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.itensService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateItenDto: UpdateItenDto) {
    return this.itensService.update(id, updateItenDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.itensService.remove(id);
  }
}
