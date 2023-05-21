import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
    async send(data:any){
        console.log(data)  
    }
}
