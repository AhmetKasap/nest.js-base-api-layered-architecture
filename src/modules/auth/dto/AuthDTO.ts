import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class AuthDTO{
    @IsNotEmpty()
    @Length(3,30)
    name : string

    @IsNotEmpty()
    @Length(3,30)
    lastname : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @Length(3,50)
    password : string
}