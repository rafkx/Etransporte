import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFiles, UseInterceptors, StreamableFile } from '@nestjs/common';
import { FilesServicoService } from './files-servico.service';
import { CreateFilesServicoDto } from './dto/create-files-servico.dto';
import { UpdateFilesServicoDto } from './dto/update-files-servico.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { FilesServico } from './entities/files-servico.entity';

@Controller('files-servico')
@JwtAuth()
export class FilesServicoController {
  constructor(private readonly filesServicoService: FilesServicoService) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 2 }
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
  handleUpload(
    @UploadedFiles() files: { file?: Express.Multer.File[] },
    @Body() createFilesServicoDto: CreateFilesServicoDto,
    @Req() req: Request
    ): Promise<FilesServico[]> {
    return this.filesServicoService.salvarDados(files['file'], createFilesServicoDto, req);
  }

  @Get('download/:fileName')
  @Roles(Role.Admin)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesServicoService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin)
  findAll(@Param('id') id: string) {
    return this.filesServicoService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin)
  remove(@Param('fileName') fileName: string) {
    return this.filesServicoService.remove(fileName);
  }
}
