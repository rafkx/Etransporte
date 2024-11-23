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
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';
import { AutorizacaoVeiculoDto } from 'src/autorizacao-veiculo/dto/autorizacao-veiculo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { extname } from 'path';

@Controller('veiculo')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() createVeiculoDto: CreateVeiculoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.veiculoService.create(createVeiculoDto);
    res.set('Location', '/veiculo/' + data.id);
    return data;
  }

  @Post('autorizacao')
  @Roles(Role.Admin, Role.Gerente)
  async createAutorizacaoVeiculo(@Body() autorizacao: AutorizacaoVeiculoDto) {
    await this.veiculoService.createAutorizacaoVeiculo(autorizacao);
  }

  @Post('photo/:id')
  @Roles(Role.Admin, Role.Gerente)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './files/veiculo',
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
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<any> {
    console.log(photo);
    return this.veiculoService.updatePhoto(id, photo);
  }

  @Get('photo/:id')
  @Roles(Role.Admin, Role.Gerente)
  async findPhoto(@Param('id') id: string, @Res() res: Response) {
    try {
      const veiculo = await this.veiculoService.findOne(id);
      const imagePath = path.join(__dirname, '../..' + veiculo.fotoCarro);

      console.log(imagePath);

      const exists = await this.checkFilesExists(imagePath);
      if (!exists) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Arquivo não encontrado' });
      }
      return res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao processar a requisição' });
    }
  }

  private async checkFilesExists(filePath: string): Promise<boolean> {
    try {
      const stats = await fs.promises.stat(filePath);
      return stats.isFile();
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(
    @Query('ano') ano: number,
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.veiculoService.findVeiculoByPlaca(ano, text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto, @AuthUser() user: Payload) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.veiculoService.paginate(pageOptionsDto);
    } else {
      return this.veiculoService.findVeiculoByFuncionario(
        user.funcionario,
        pageOptionsDto,
      );
    }
  }

  @Get('autorizacao')
  @Roles(Role.Admin, Role.Gerente)
  findAllAutorizacao() {
    return this.veiculoService.findAllAutorizacao();
  }

  @Get()
  @Roles(Role.Admin, Role.User, Role.Gerente)
  findAll(@AuthUser() user: Payload) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.veiculoService.findAll();
    } else {
      return this.veiculoService.findAllByFuncionario(user.funcionario);
    }
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(id);
  }
}
