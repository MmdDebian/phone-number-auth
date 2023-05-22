import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService  ,
    ){}

    // @Get()
    // async findAll(){
    //     return this.userService.findAll()
    // }
}