import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFiles,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { FilesFuncionarioService } from './files-funcionario.service';
import { CreateFilesFuncionarioDto } from './dto/create-files-funcionario.dto';
import { UpdateFilesFuncionarioDto } from './dto/update-files-funcionario.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesFuncionario } from './entities/files-funcionario.entity';

@Controller('files-funcionario')
@JwtAuth()
export class FilesFuncionarioController {
  constructor(
    private readonly filesFuncionarioService: FilesFuncionarioService,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file', maxCount: 5 }], {
      storage: diskStorage({
        destination: './files/funcionario',
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
  handelUpload(
    @UploadedFiles() files: { file?: Express.Multer.File[] },
    @Body() createFileFuncionarioDto: CreateFilesFuncionarioDto,
    @Req() req: Request,
  ): Promise<FilesFuncionario[]> {
    return this.filesFuncionarioService.salvarDados(
      files['file'],
      createFileFuncionarioDto,
      req,
    );
  }

  @Get('download/:fileName')
  @Roles(Role.Admin)
  download(@Param('fileName') fileName: string): StreamableFile {
    return this.filesFuncionarioService.download(fileName);
  }

  @Get(':id')
  @Roles(Role.Admin)
  findAll(@Param('id') id: string) {
    return this.filesFuncionarioService.findAll(id);
  }

  @Delete(':fileName')
  @Roles(Role.Admin)
  remove(@Param('fileName') fileName: string) {
    return this.filesFuncionarioService.remove(fileName);
  }
}
