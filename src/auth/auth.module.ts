import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from 'src/otp/otp.module';
import { SmsModule } from 'src/sms/sms.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports : [
        UserModule , 
        OtpModule , 
        SmsModule ,
        JwtModule.registerAsync({
            imports : [ConfigModule.forRoot({
                isGlobal : true 
            })],
            useFactory : async (configService:ConfigService)=>({
                secret : configService.get<string>('JWT_SECRET_KEY') ,
                signOptions : {
                    expiresIn : configService.get<string>('JWT_EXPIRE_TIME') ,
                }
            }),
            inject : [ConfigService] ,
        }), 
    ] ,
    controllers : [AuthController] , 
    providers : [AuthService , JwtStrategy] ,
})
export class AuthModule {}
