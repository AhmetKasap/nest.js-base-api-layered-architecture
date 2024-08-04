import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class PasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(5,50)
    password : string
}