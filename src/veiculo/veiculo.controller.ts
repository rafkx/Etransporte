import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import e, { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('veiculo')
@JwtAuth()
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createVeiculoDto: CreateVeiculoDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.veiculoService.create(createVeiculoDto);
    res.set('Location', '/veiculo/' + data.id);
    return data;
  }

  @Post('file')
  @Roles(Role.Admin)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './files/veiculo',
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
  filter(@Query('ano') ano: number, @Query('text') text: string) {
    return this.veiculoService.findVeiculoByPlaca(ano, text)
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(id);
  }
}
