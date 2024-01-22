import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Res,
  Query,
} from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { Response } from 'express';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('manutencao')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class ManutencaoController {
  constructor(private readonly manutencaoService: ManutencaoService) {}

  @Post()
  @Roles(Role.Admin, Role.Gerente)
  async create(
    @Body() createManutencaoDto: CreateManutencaoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.manutencaoService.create(createManutencaoDto);
    res.set('Location', '/manutencao/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(@Query('data') data: any, @Query() pageOptionsDto: PageOptionsDto) {
    return this.manutencaoService.findManutencaoByDate(data, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.Gerente)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.manutencaoService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.manutencaoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.manutencaoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Gerente)
  update(
    @Param('id') id: string,
    @Body() updateManutencaoDto: UpdateManutencaoDto,
  ) {
    return this.manutencaoService.update(id, updateManutencaoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Gerente)
  remove(@Param('id') id: string) {
    return this.manutencaoService.remove(id);
  }
}
