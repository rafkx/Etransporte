import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PecasService } from './pecas.service';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Peca } from './entities/peca.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pecas')
@JwtAuth()
export class PecasController {
  constructor(private readonly pecasService: PecasService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createPecaDto: CreatePecaDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.pecasService.create(createPecaDto);
    res.set('location', '/pecas/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  fiter(@Query('text') text: string) {
    return this.pecasService.findPecaByName(text)
    
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.pecasService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.pecasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updatePecaDto: UpdatePecaDto) {
    return this.pecasService.update(id, updatePecaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.pecasService.remove(id);
  }
}
