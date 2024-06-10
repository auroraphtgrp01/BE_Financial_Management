import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessages.constants'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' })
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.authService.validateUser(username, password)
    // if (!user) {
    //   throw new UnauthorizedException(RESPONSE_MESSAGES.USER_MESSAGES.USER_UNAUTHORIZED)
    // }
    // return user
  }
}
