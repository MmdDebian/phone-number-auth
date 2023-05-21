import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';


@Module({
    imports : [ 
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService:ConfigService):TypeOrmModuleOptions => ({
                    type: 'mysql',
                    host: configService.get<string>('MYSQL_HOST','127.0.0.1'),
                    port : configService.get<number>('MYSQL_PORT',3306),
                    username: configService.get<string>('MYSQL_USER','mohamad'),
                    password: configService.get<string>('MYSQL_PASSWORD','mohamad'),
                    database: configService.get<string>('MYSQL_DATABASE','auth'),
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    synchronize: configService.get<string>('MODE','DEV') == 'DEV',
                    autoLoadEntities: true,
            })
        })
    ]
})
export class DatabaseModule {}
