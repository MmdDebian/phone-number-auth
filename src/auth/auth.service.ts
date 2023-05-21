import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { statusResult } from 'src/shared/statusResult/statusResult';
import { SmsService } from 'src/sms/sms.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtPayload } from './jwt/jwtPayload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService ,
        private readonly jwtService:JwtService ,
        private readonly smsService:SmsService  ,
        private readonly otpService:OtpService ,
    ){}

    private async _signToken(payload:JwtPayload):Promise<string>{
        return await this.jwtService.sign(
            payload , 
            {
                secret : 'secret' , 
                expiresIn : '1h'
            }
        )
    }

    
    private async _register(phoneNumber:string):Promise<statusResult>{
        let status:statusResult = {
            message : 'user register in successfully' , 
            success : true , 
        }

        try {
            const user = await this.userService.create({phoneNumber});
            const otp = await this.otpService.generateOtpCode(user.id);
            status.phoneNumber = phoneNumber ;
            this.smsService.send(otp.code) ;

        } catch (error) {
            return {
                message : error.message , 
                success : false
            }
        }

        return status ;
    }

    async login(loginDto:LoginDto):Promise<statusResult>{
        let status:statusResult = {
            message : 'user logged in successfully' , 
            success : true , 
        }
        try {
            const { phoneNumber } = loginDto ;

            // check user exist
            const userInDb = await this.userService.findByPhoneNumber(phoneNumber);


            // get for user register
            if(!userInDb){
                return await this._register(phoneNumber) ;
            }

            const otp = await this.otpService.generateOtpCode(userInDb.id);
            status.phoneNumber = phoneNumber ;
            this.smsService.send(otp.code) ;
            
        } catch (error) {
            return {
                message : error.message , 
                success : false
            }
        }

        return status ;
    }

    async verify(verifyDto:VerifyDto):Promise<{access_token : string }>{
        const { phoneNumber , otpCode } = verifyDto ;
        const user = await this.userService.findByPhoneNumber(phoneNumber);

        if(!user){
            throw new BadRequestException('phone number is invalid')
        }

        if(!await this.otpService.validateOtpCode(user.id , otpCode)){
            throw new BadRequestException('otp code is invalid')
        }


        const token = await this._signToken({sub : user.id});
        return { access_token : token}
    }
}
