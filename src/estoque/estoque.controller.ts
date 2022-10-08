import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('estoque')
@JwtAuth()
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createEstoqueDto: CreateEstoqueDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.estoqueService.create(createEstoqueDto);
    res.set('location', '/estoque/' + data.id);
    return this.estoqueService.create(createEstoqueDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.estoqueService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return this.estoqueService.update(id, updateEstoqueDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.estoqueService.remove(id);
  }
}
