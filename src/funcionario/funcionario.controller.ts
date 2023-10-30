import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuth } from '../decorators/jwt.auth.decorator';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Funcionario } from './entities/funcionario.entity';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AssociateFuncionarioVeiculoDto } from './dto/associate-funcionario-veiculo.dto';

@Controller('funcionario')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createFuncionarioDto: CreateFuncionarioDto, @Res({ passthrough: true }) res: Response )  {
    const data = await this.funcionarioService.create(createFuncionarioDto);
    res.set('location', '/funcionario/' + data.id)
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    return this.funcionarioService.search(text, pageOptionsDto);
  }

  @Get('paginate')
  @Roles(Role.Admin)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.funcionarioService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionarioService.update(id, updateFuncionarioDto);
  }

  @Patch('association/:id')
  @Roles(Role.Admin, Role.Gerente)
  associate(@Param('id') id: string, @Body() associateFuncionarioVeiculo: AssociateFuncionarioVeiculoDto) {
    return this.funcionarioService.associate(id, associateFuncionarioVeiculo);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(id);
  }
}
