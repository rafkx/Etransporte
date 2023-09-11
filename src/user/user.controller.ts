import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Res, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtAuth } from 'src/decorators/jwt.auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { PageOptionsDto } from 'src/dtos/page-options.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@JwtAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.userService.create(createUserDto);
    res.set('location', '/user/' + data.id)
    return data;
  }

  @Get('filter')
  @Roles(Role.Admin)
  filter(
    @Query('text') text: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.userService.findUsername(text, pageOptionsDto);
  }


  @Get('paginate')
  @Roles(Role.Admin)
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.userService.paginate(pageOptionsDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
