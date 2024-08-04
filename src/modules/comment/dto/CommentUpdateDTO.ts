import { IsNotEmpty, IsUUID, Length } from "class-validator";
export class CommentUpdateDTO {
    @IsNotEmpty()
    @Length(5,200)
    text : string

}

