import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';


@Module({
    imports : [ 
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService:ConfigService):TypeOrmModuleOptions => ({
                    type: 'postgres',
                    host: configService.get<string>('POSTGRES_HOST','127.0.0.1'),
                    port : configService.get<number>('POSTGRES_PORT' , 5432),
                    username: configService.get<string>('POSTGRES_USER','mohamad'),
                    password: configService.get<string>('POSTGRES_PASSWORD','mohamad'),
                    database: configService.get<string>('POSTGRES_DATABASE','auth'),
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    synchronize: true,
                    autoLoadEntities: true,
            })
        })
    ]
})
export class DatabaseModule {}
