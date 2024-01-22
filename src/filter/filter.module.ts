import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmPostgresExceptionFilter } from './typeorm.exception.filter';

@Global()
@Module({
  imports: [],
  exports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmPostgresExceptionFilter,
    },
  ],
})
export class FilterModule {}
