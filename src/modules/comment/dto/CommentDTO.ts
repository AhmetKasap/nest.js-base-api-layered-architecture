import { IsNotEmpty, IsUUID, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(5,200)
    text : string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    postId : string
}

