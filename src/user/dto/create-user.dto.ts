import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Role } from "src/enums/role.enum";
import { messagesHelper } from "src/helpers/messages.helper";
import { regexHelper } from "src/helpers/regex.helper";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(regexHelper.password, { message: messagesHelper.PASSWORD_VALID})
    password: string;
}
