import { IsNotEmpty, Length } from "class-validator";

export class VerifyDto {
    @IsNotEmpty()
    phoneNumber : string ;

    @IsNotEmpty()
    otpCode : string ;
}