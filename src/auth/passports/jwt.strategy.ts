import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { configService } from 'src/configs/config.services'
import { IUser } from 'src/interfaces/User.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwt.JWT_ACCESS_TOKEN_SECRET_KEY
        })
    }

    async validate(user: IUser) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
}
