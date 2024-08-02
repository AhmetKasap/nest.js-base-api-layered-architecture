import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class PostDTO{
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,50)
    title : string

    @ApiProperty()
    @IsNotEmpty()
    @Length(10,200)
    content : string
}