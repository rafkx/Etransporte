import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req, StreamableFile } from '@nestjs/common';
import { FilesAbastecimentoService } from './files-abastecimento.service';
import { CreateFilesAbastecimentoDto } from './dto/create-files-abastecimento.dto';
import { UpdateFilesAbastecimentoDto } from './dto/update-files-abastecimento.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Request } from 'express';
import { FilesAbastecimento } from './entities/files-abastecimento.entity';

@Controller('files-abastecimento')
@JwtAuth()
export class FilesAbastecimentoController {
  constructor(private readonly filesAbastecimentoService: FilesAbastecimentoService) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files/abastecimento',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
        callback(null, filename);
      }
    })
  }))
  handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFilesAbestecimentoDto: CreateFilesAbastecimentoDto, 
    @Req() req: Request): Promise<FilesAbastecimento[]> {
    return this.filesAbastecimentoService.salvarDados(file, createFilesAbestecimentoDto, req);
  }

  @Get('download/:fileName')
  @Roles(Role.Admin)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesAbastecimentoService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin)
  findAll(@Param('id') id: string) {
    return this.filesAbastecimentoService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin)
  remove(@Param('fileName') fileName: string) {
    return this.filesAbastecimentoService.remove(fileName);
  }
}
