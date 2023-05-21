import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from 'src/otp/otp.module';
import { SmsModule } from 'src/sms/sms.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports : [JwtModule , UserModule , OtpModule , SmsModule ] ,
    controllers : [AuthController] , 
    providers : [AuthService] ,
})
export class AuthModule {}
