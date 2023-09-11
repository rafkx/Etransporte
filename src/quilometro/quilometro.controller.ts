import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { QuilometroService } from './quilometro.service';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('quilometro')
@UseInterceptors(ClassSerializerInterceptor)
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
  filter(
    @Query('data') data: any, 
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto
    ) {
    return this.quilometroService.findKmByDate(
      data,
      text,
      pageOptionsDto
    )
  }

  @Get('paginate')
  @Roles(Role.Admin)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.quilometroService.paginate(pageOptionsDto);
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
