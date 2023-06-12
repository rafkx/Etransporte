import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
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
  handleUpload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesAbastecimentoService.salvarDados(file, req);
  }

  @Get()
  findAll() {
    return this.filesAbastecimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesAbastecimentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilesAbastecimentoDto: UpdateFilesAbastecimentoDto) {
    return this.filesAbastecimentoService.update(+id, updateFilesAbastecimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesAbastecimentoService.remove(+id);
  }
}
