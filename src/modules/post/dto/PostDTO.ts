import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class PostDTO{
    @IsNotEmpty()
    @Length(3,50)
    title : string

    @IsNotEmpty()
    @Length(10,200)
    content : string
}