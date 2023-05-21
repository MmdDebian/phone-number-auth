import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [ DatabaseModule ,  AuthModule , AuthModule, UserModule, SmsModule, OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
