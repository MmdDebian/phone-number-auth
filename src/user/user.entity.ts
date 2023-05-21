import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('User')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')    
    id : string ;

    @Column({type : 'varchar' , default : null})
    name : string ;

    @Column({type : 'varchar' , default : null})
    lastName : string ;


    @Column({type : 'varchar' , nullable : false})
    phoneNumber : string ; 

}