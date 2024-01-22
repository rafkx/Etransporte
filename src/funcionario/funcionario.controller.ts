import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuth } from '../decorators/jwt.auth.decorator';
import { Response } from 'express';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('funcionario')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() createFuncionarioDto: CreateFuncionarioDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.funcionarioService.create(createFuncionarioDto);
    res.set('location', '/funcionario/' + data.id);
    return data;
  }

  @Post('photo')
  @Roles(Role.User, Role.Admin, Role.Gerente)
  @UseInterceptors(
    FileInterceptor('photo', {
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
  async updatePhoto(
    @AuthUser() user: Payload,
    @Req() req: Request,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<any> {
    return this.funcionarioService.updatePhoto(user.funcionario, photo, req);
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(@Query('text') text: string, @Query() pageOptionsDto: PageOptionsDto) {
    return this.funcionarioService.search(text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.funcionarioService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(id, updateFuncionarioDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(id);
  }
}
