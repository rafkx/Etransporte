import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { QueryFailedError } from 'typeorm';
  
  export const PG_UNIQUE_VIOLATION = '23505';
  
  // https://github.com/drdgvhbh/postgres-error-codes/blob/master/src/index.ts
  
  @Catch(QueryFailedError)
  export class TypeOrmPostgresExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

    const error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: 'Internal Server Error',
    };

    /*
    console.log('ERROR CODE: ' + exception['code']);
    console.log(exception);
    */

    if (exception['code'] === PG_UNIQUE_VIOLATION) {
      error.error = 'Conflict';
      error.statusCode = HttpStatus.CONFLICT;
      error.message =
        'Unique Violation. ' +
        (exception['detail'] ? exception['detail'] + ' ' : '') +
        error.message;
      response.status(HttpStatus.CONFLICT).json(error);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}