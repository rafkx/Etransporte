import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { FilesPecaService } from './files-peca.service';
import { CreateFilesPecaDto } from './dto/create-files-peca.dto';
import { UpdateFilesPecaDto } from './dto/update-files-peca.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Request } from 'express';

@Controller('files-peca')
@JwtAuth()
export class FilesPecaController {
  constructor(private readonly filesPecaService: FilesPecaService) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
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
    @UploadedFiles() 
    files: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
    @Req() req: Request) {
    return this.filesPecaService.salvarDados(files['image, file'], req);
  }

  @Get()
  findAll() {
    return this.filesPecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesPecaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilesPecaDto: UpdateFilesPecaDto) {
    return this.filesPecaService.update(+id, updateFilesPecaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesPecaService.remove(+id);
  }
}
