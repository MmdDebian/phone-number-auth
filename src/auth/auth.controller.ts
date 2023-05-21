import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SmsService } from 'src/sms/sms.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService ,
    ){}

    @Post('login')
    async login(@Body() loginDto:LoginDto){
        const result = await this.authService.login(loginDto)

        if(!result.success){
            throw new BadRequestException(result.message) ;
        }

        return result ; 
    }

    @Post('verify')
    async verify(@Body() verifyDto:VerifyDto){
        return await this.authService.verify(verifyDto) ;
    }
}
