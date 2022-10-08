import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';
import { Role } from '../enums/role.enum';
import { Roles } from './role.decorator';


export function JwtAuth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard('jwt'), RolesGuard));
}