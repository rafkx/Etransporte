import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { QuilometroService } from './quilometro.service';
import { CreateQuilometroDto } from './dto/create-quilometro.dto';
import { UpdateQuilometroDto } from './dto/update-quilometro.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { PageOptionsDto } from 'src/dtos/page-options.dto';
import { AuthUser } from 'src/auth/decorator/request.user.decorator';
import { Payload } from 'src/DTOs/payload.dto';

@Controller('quilometro')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class QuilometroController {
  constructor(private readonly quilometroService: QuilometroService) {}

  @Post()
  @Roles(Role.Admin, Role.User, Role.Gerente)
  async create(@Body() createQuilometroDto: CreateQuilometroDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.quilometroService.create(createQuilometroDto);
    res.set('location', '/quilometro/' + data.id);
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin, Role.Gerente)
  filter(
    @Query('data') data: any, 
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto
    ) {
    return this.quilometroService.findKmByDate(
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
      return this.quilometroService.paginate(pageOptionsDto);
    } else {
      return this.quilometroService.findQuilometroByFuncionario(user.funcionario, pageOptionsDto);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Gerente)
  findAll() {
    return this.quilometroService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  findOne(@Param('id') id: string) {
    return this.quilometroService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  update(
    @Param('id') id: string, 
    @Body() updateQuilometroDto: UpdateQuilometroDto,
    @AuthUser() user: Payload,  
  ) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.quilometroService.update(id, updateQuilometroDto);
    } else {
      return this.quilometroService.updateByUser(user.funcionario, updateQuilometroDto);
    } 
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User, Role.Gerente)
  remove(
    @Param('id') id: string,
    @AuthUser() user: Payload,  
  ) {
    if (user.role.includes(Role.Admin) || user.role.includes(Role.Gerente)) {
      return this.quilometroService.remove(id);
    } else {
      return this.quilometroService.removeByFuncionario(id);
    }
  }
}
