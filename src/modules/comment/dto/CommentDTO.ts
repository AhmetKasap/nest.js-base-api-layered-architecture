import { IsEmpty, Length } from "class-validator";
export class CommentDTO {
    @IsEmpty()
    @Length(5,200)
    text : string
}

