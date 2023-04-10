import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuilometroService } from './quilometro.service';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post('file')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files/quilometro',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
        callback(null, filename);
      }
    })
  }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    return { filePath: file.path }
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
