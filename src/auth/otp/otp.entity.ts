import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity('Otp')
export class OtpEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string ; 

    @Column({type : 'varchar' , nullable : false})
    code : string ; 

    @Column({type : 'uuid' , nullable : false})
    userId : string ;

    @Column({type : "date",nullable :false})
    expirationTime: Date;
}