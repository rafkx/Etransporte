import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post('file')
  @Roles(Role.Admin)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ], {
    storage: diskStorage({
      destination: './files/servico',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
        callback(null, filename)
      }
    })
  }))
  handleUpload(@UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] }) {
    return files;
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
