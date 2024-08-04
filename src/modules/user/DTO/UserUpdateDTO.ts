import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class UserUpdateDTO{
    @IsNotEmpty()
    @Length(3,30)
    name : string

    @IsNotEmpty()
    @Length(3,30)
    lastname : string
}