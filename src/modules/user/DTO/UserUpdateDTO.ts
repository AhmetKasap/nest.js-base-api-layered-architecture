import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";


export class UserUpdateDTO{
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,30)
    name : string

    @ApiProperty()
    @IsNotEmpty()
    @Length(3,30)
    lastname : string
}