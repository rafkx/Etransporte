import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { FilesQuilometroService } from './files-quilometro.service';
import { CreateFilesQuilometroDto } from './dto/create-files-quilometro.dto';
import { UpdateFilesQuilometroDto } from './dto/update-files-quilometro.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Request } from 'express';
import { FilesQuilometro } from './entities/files-quilometro.entity';

@Controller('files-quilometro')
@JwtAuth()
export class FilesQuilometroController {
  constructor(
    private readonly filesQuilometroService: FilesQuilometroService,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.User, Role.Gerente)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/quilometro',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFilesQuilometroDto: CreateFilesQuilometroDto,
    @Req() req: Request,
  ): Promise<FilesQuilometro[]> {
    return this.filesQuilometroService.salvarDados(
      file,
      createFilesQuilometroDto,
      req,
    );
  }

  @Get('download/:fileName')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesQuilometroService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.filesQuilometroService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  remove(@Param('fileName') fileName: string) {
    return this.filesQuilometroService.remove(fileName);
  }
}
