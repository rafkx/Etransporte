import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Response } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('fornecedor')
@JwtAuth()
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createFornecedorDto: CreateFornecedorDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.fornecedorService.create(createFornecedorDto);
    res.set('location', '/fornecedor/' + data.id)
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.fornecedorService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateFornecedorDto: UpdateFornecedorDto) {
    return this.fornecedorService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.fornecedorService.remove(id);
  }
}
