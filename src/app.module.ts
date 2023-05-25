import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './user/user.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './auth/otp/otp.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal : true}),
    DatabaseModule ,  
    AuthModule, 
    UserModule, 
    SmsModule, 
    OtpModule, 
    ProfileModule ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
