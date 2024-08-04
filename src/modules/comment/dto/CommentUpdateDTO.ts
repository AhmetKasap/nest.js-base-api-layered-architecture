import { IsNotEmpty, IsUUID, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentUpdateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(5,200)
    text : string

}

