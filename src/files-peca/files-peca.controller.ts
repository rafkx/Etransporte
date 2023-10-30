import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req, StreamableFile } from '@nestjs/common';
import { FilesPecaService } from './files-peca.service';
import { CreateFilesPecaDto } from './dto/create-files-peca.dto';
import { UpdateFilesPecaDto } from './dto/update-files-peca.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Request } from 'express';
import { FilesPeca } from './entities/files-peca.entity';

@Controller('files-peca')
@JwtAuth()
export class FilesPecaController {
  constructor(private readonly filesPecaService: FilesPecaService) {}

  @Post()
  @Roles(Role.Admin, Role.Gerente)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 5 },
  ], {
    storage: diskStorage({
      destination: './files/peca', 
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
    @Body() createFilesPecaDto: CreateFilesPecaDto,
    @Req() req: Request
    ): Promise<FilesPeca[]> {
    return this.filesPecaService.salvarDados(files['file'], createFilesPecaDto, req);
  }

  @Get('download/:fileName')
  @Roles(Role.Admin, Role.Gerente)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesPecaService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findAll(@Param('id') id: string) {
    return this.filesPecaService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin, Role.Gerente)
  remove(@Param('fileName') fileName: string) {
    return this.filesPecaService.remove(fileName);
  }
}
