import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statusResult } from 'src/shared/statusResult/statusResult';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>
    ){}


    async findAll():Promise<UserEntity[]>{
        return this.userRepo.find()
    }

    async findOne(where : object):Promise<UserEntity>{
        return await this.userRepo.findOne(where) ;
    }

    async findByPhoneNumber(phoneNumber:string):Promise<UserEntity>{
        return await this.userRepo.findOneBy({phoneNumber});
    }

    async create(createUserDto:CreateUserDto):Promise<UserEntity>{
        const {phoneNumber} = createUserDto ;
        
        const userInDb = await this.userRepo.findOne({
            where : { phoneNumber }
        })

        if(userInDb){
            throw new BadRequestException('user alredy exist')
        }
    
        const user = this.userRepo.create({phoneNumber});
        return await this.userRepo.save(user);
    }
}