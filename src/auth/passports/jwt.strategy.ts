import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IUser } from 'src/interfaces/User.interface'
import { ConfigService } from 'src/configs/config.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getConfigService('jwt').JWT_ACCESS_TOKEN_SECRET_KEY
    })
  }

  async validate(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
