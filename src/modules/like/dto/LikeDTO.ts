import { IsNotEmpty, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class LikeDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    postId : string
}