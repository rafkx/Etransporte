import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFiles, UseInterceptors, StreamableFile } from '@nestjs/common';
import { FilesVeiculoService } from './files-veiculo.service';
import { CreateFilesVeiculoDto } from './dto/create-files-veiculo.dto';
import { UpdateFilesVeiculoDto } from './dto/update-files-veiculo.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { FilesVeiculo } from './entities/files-veiculo.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { createReadStream } from 'fs';

@Controller('files-veiculo')
@JwtAuth()
export class FilesVeiculoController {
  constructor(private readonly filesVeiculoService: FilesVeiculoService) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 2 },
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
  handleUpload(
    @UploadedFiles() files: { file?: Express.Multer.File[] }, 
    @Body() createFilesVeiculoDto: CreateFilesVeiculoDto,
    @Req() req: Request
    ): Promise<FilesVeiculo[]> {
    return this.filesVeiculoService.salvarDados(files['file'], createFilesVeiculoDto, req);
  }

  @Get('download/:fileName')
  @Roles(Role.Admin)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesVeiculoService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.filesVeiculoService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin)
  remove(@Param('fileName') fileName: string) {  
    return this.filesVeiculoService.remove(fileName);
  }
}
