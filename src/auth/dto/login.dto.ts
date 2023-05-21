import { IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @Length(11 , 11)
    phoneNumber : string ;
}