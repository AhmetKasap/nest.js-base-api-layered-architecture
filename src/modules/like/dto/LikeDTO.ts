import { IsNotEmpty } from "class-validator"

export class LikeDTO {
    @IsNotEmpty()
    count : number
}