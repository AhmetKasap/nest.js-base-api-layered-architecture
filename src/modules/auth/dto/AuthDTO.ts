import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';



export class AuthDTO{
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

    @ApiProperty({
        default: "test",
    })
    @IsNotEmpty()
    @Length(3,50)
    password : string
}