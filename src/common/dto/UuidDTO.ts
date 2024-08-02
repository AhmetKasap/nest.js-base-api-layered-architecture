import { IsNotEmpty, IsUUID } from "class-validator";

export class UuidDTO{
    @IsNotEmpty()
    @IsUUID()
    id : string
}