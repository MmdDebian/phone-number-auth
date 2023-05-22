import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt} from "passport-jwt";
import { UserEntity } from "src/user/user.entity";
import { AuthService } from "../auth.service";
import { JwtPayload } from "./jwtPayload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService:AuthService,
        private readonly configService:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false , 
            secretOrKey: configService.get<string>('JWT_SECRET_KEY')
        })
    }

    async validate(payload:JwtPayload):Promise<UserEntity>{
        const user = await this.authService.validateUser(payload);

        if(!user){
            throw new UnauthorizedException('Invalid Token');
        }

        return user ;
    }
}