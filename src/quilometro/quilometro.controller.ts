import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { QuilometroService } from './quilometro.service';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('quilometro')
@JwtAuth()
export class QuilometroController {
  constructor(private readonly quilometroService: QuilometroService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createQuilometroDto: CreateQuilometroDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.quilometroService.create(createQuilometroDto);
    res.set('location', '/quilometro/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(@Query('data') data: any) {
    return this.quilometroService.findKmByDate({
      data: data
    })
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.quilometroService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.quilometroService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateQuilometroDto: UpdateQuilometroDto) {
    return this.quilometroService.update(id, updateQuilometroDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.quilometroService.remove(id);
  }
}
