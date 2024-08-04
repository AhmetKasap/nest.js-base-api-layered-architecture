import { IsNotEmpty, Length } from "class-validator";

export class PasswordDTO {
    @IsNotEmpty()
    @Length(5,50)
    password : string
}