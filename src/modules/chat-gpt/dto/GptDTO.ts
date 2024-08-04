import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class GptDTO{
    @ApiProperty()
    @IsNotEmpty()
    @Length(10,100)
    content : string
}