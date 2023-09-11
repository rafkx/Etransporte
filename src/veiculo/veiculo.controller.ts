import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UploadedFiles, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import e, { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('veiculo')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createVeiculoDto: CreateVeiculoDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.veiculoService.create(createVeiculoDto);
    res.set('Location', '/veiculo/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(
    @Query('ano') ano: number, 
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
    ) {
    return this.veiculoService.findVeiculoByPlaca(ano, text, pageOptionsDto)
  }

  @Get('paginate')
  @Roles(Role.Admin)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.veiculoService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get('search/:id')
  @Roles(Role.User, Role.Admin)
  searchFuncionario(
    @Param('id') id: string
  ) {
    return this.veiculoService.findVeiculoByFuncionario(id);
  }

  @Get()
  @Roles(Role.Admin)
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
