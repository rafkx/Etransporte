import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AbastecimentoService } from './abastecimento.service';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';

@Controller('abastecimento')
@JwtAuth()
export class AbastecimentoController {
  constructor(private readonly abastecimentoService: AbastecimentoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createAbastecimentoDto: CreateAbastecimentoDto, @Res({ passthrough: true }) res: Response ) {
    const data = await this.abastecimentoService.create(createAbastecimentoDto);
    res.set('location', '/abastecimento/' + data.id)
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(@Query('data') data: any, @Query('text') text: string) {
    return this.abastecimentoService.findAbastecimentoByDate(
      data,
      text,
    )
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.abastecimentoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.abastecimentoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateAbastecimentoDto: UpdateAbastecimentoDto) {
    return this.abastecimentoService.update(id, updateAbastecimentoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.abastecimentoService.remove(id);
  }
}
