import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFiles, ClassSerializerInterceptor } from '@nestjs/common';
import { PecasService } from './pecas.service';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('pecas')
@UseInterceptors(ClassSerializerInterceptor)
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
  fiter(
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
    ) {
    return this.pecasService.findPecaByName(text, pageOptionsDto);
    
  }

  @Get('paginate')
  @Roles(Role.Admin)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.pecasService.paginate(pageOptionsDto);
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
