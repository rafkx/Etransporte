import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, Query, ClassSerializerInterceptor } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AbastecimentoService } from './abastecimento.service';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';

@Controller('abastecimento')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class AbastecimentoController {
  constructor(private readonly abastecimentoService: AbastecimentoService) {}

  @Post()
  @Roles(Role.Admin, Role.User, Role.Gerente)
  async create(@Body() createAbastecimentoDto: CreateAbastecimentoDto, @Res({ passthrough: true }) res: Response ) {
    const data = await this.abastecimentoService.create(createAbastecimentoDto);
    res.set('location', '/abastecimento/' + data.id)
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(
    @Query('data') data: any, 
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
    ) {
    return this.abastecimentoService.findAbastecimentoByDate(
      data,
      text,
      pageOptionsDto
    )
  }

  @Get('paginate')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  paginate(
    @Query() pageOptionsDto: PageOptionsDto,
    @AuthUser() user: Payload  
  ) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.abastecimentoService.paginate(pageOptionsDto);
    } else {
      return this.abastecimentoService.findAbastecimentoByFuncionario(user.funcionario, pageOptionsDto);
    } 
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.abastecimentoService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.abastecimentoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  update(
    @Param('id') id: string, 
    @Body() updateAbastecimentoDto: UpdateAbastecimentoDto,
    @AuthUser() user: Payload,  
  ) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.abastecimentoService.update(id, updateAbastecimentoDto);
    } else {
      return this.abastecimentoService.updateByUser(id, updateAbastecimentoDto);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  remove(
    @Param('id') id: string,
    @AuthUser() user: Payload  
  ) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.abastecimentoService.remove(id);
    } else {
      return this.abastecimentoService.removeByFuncionario(id);
    }
  }
}
