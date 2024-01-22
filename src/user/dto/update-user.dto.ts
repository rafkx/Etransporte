import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { messagesHelper } from 'src/helpers/messages.helper';
import { regexHelper } from 'src/helpers/regex.helper';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(regexHelper.password, { message: messagesHelper.PASSWORD_VALID })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(regexHelper.password, { message: messagesHelper.PASSWORD_VALID })
  lastPassword: string;
}
