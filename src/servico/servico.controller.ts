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
  UploadedFiles,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';

@Controller('servico')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @Roles(Role.Admin, Role.Gerente)
  async create(
    @Body() createServicoDto: CreateServicoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.servicoService.create(createServicoDto);
    res.set('location', '/servico/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(@Query('text') text: string, @Query() pageOptionsDto: PageOptionsDto) {
    return this.servicoService.findServico(text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto, @AuthUser() user: Payload) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.servicoService.paginate(pageOptionsDto);
    } else {
      return this.servicoService.findServicoByFuncionario(
        user.funcionario,
        pageOptionsDto,
      );
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.servicoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Gerente)
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicoService.update(id, updateServicoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Gerente)
  remove(@Param('id') id: string) {
    return this.servicoService.remove(id);
  }
}
