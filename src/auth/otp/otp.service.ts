import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandomInt } from 'src/shared/helper/random-number.helper';
import { Repository } from 'typeorm';
import { OtpEntity } from './otp.entity';

@Injectable()
export class OtpService {

    constructor(
        @InjectRepository(OtpEntity)
        private readonly otpRepo:Repository<OtpEntity>,
    ){}
    
    async generateOtpCode(userId:string):Promise<OtpEntity>{
        // otp code
        const code = getRandomInt(9999);
        // expire time 
        const expirationTime = new Date(Date.now() + 1 * 60 * 1000)

        const otp = this.otpRepo.create({
          code ,
          expirationTime , 
          userId ,
        })


        return await this.otpRepo.save(otp);
    }

    async validateOtpCode(userId: string, code: string): Promise<boolean> {
        const otpCode = await this.otpRepo.findOne({
          where: { userId },
        });
    
        if (!otpCode || otpCode.code !== code) {
          return false;
        }
    
        if (otpCode.expirationTime < new Date()) {
          return false;
        }
    
        // Optional: Clean up the used OTP code
        await this.otpRepo.delete(otpCode.id);
    
        return true;
      }
}
