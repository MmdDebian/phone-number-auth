import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

type Where = FindOptionsWhere<UserEntity>

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>
    ){}


    async findAll():Promise<UserEntity[]>{
        return this.userRepo.find()
    }

    async findOne(where : Where):Promise<UserEntity>{
        return await this.userRepo.findOne({where}) ;
    }
    
    async create(createUserDto:CreateUserDto):Promise<UserEntity>{
        const {phoneNumber} = createUserDto ;
        
        const userInDb = await this.findOne({phoneNumber});

        if(userInDb){
            throw new BadRequestException('user alredy exist')
        }
    
        const user = this.userRepo.create({phoneNumber});
        return await this.userRepo.save(user);
    }
}
