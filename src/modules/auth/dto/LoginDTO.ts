import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @ApiProperty()
    @IsNotEmpty()
    @Length(3,50)
    password : string
}