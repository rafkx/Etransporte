import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UploadedFiles, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import e, { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from 'src/DTOs/payload.dto';
import { AutorizacaoVeiculoDto } from 'src/autorizacao-veiculo/dto/autorizacao-veiculo.dto';

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

  @Post('autorizacao')
  @Roles(Role.Admin, Role.Gerente)
  async createAutorizacaoVeiculo(@Body() autorizacao: AutorizacaoVeiculoDto) {
    await this.veiculoService.createAutorizacaoVeiculo(autorizacao);
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(
    @Query('ano') ano: number, 
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
    ) {
    return this.veiculoService.findVeiculoByPlaca(ano, text, pageOptionsDto)
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(
    @Query() pageOptionsDto: PageOptionsDto, 
    @AuthUser() user: Payload  
  ) {
    if(user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.veiculoService.paginate(pageOptionsDto);
    } else {
      return this.veiculoService.findVeiculoByFuncionario(user.funcionario, pageOptionsDto);
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
