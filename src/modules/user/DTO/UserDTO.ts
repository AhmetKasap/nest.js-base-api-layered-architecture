import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";


export class UserDTO{
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,30)
    name : string

    @ApiProperty()
    @IsNotEmpty()
    @Length(3,30)
    lastname : string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @ApiProperty()
    @IsNotEmpty()
    @Length(5,50)
    password : string
}