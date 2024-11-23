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
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { PecasService } from './pecas.service';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { Request, Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pecas')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class PecasController {
  constructor(private readonly pecasService: PecasService) {}

  @Post()
  @Roles(Role.Admin, Role.Gerente)
  async create(
    @Body() createPecaDto: CreatePecaDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.pecasService.create(createPecaDto);
    res.set('location', '/pecas/' + data.id);
    return data;
  }

  @Post('photo/:id')
  @Roles(Role.Admin, Role.Gerente)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public',
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
    @Param('id') id: string,
    @Req() req: Request,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<any> {
    console.log(photo);
    return this.pecasService.updatePhoto(id, photo, req);
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  fiter(@Query('text') text: string, @Query() pageOptionsDto: PageOptionsDto) {
    return this.pecasService.findPecaByName(text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto, @AuthUser() user: Payload) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.pecasService.paginate(pageOptionsDto);
    } else {
      return this.pecasService.findPecaByFuncionario(
        user.funcionario,
        pageOptionsDto,
      );
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.pecasService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.pecasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Gerente)
  update(@Param('id') id: string, @Body() updatePecaDto: UpdatePecaDto) {
    return this.pecasService.update(id, updatePecaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Gerente)
  remove(@Param('id') id: string) {
    return this.pecasService.remove(id);
  }
}
