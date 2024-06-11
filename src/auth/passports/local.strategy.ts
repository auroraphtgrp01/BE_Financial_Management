import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'username', passwordField: 'password' })
  }

  async validate(): Promise<any> {
    // const user = await this.authService.validateUser(username, password)
    // if (!user) {
    //   throw new UnauthorizedException(RESPONSE_MESSAGES.USER_MESSAGES.USER_UNAUTHORIZED)
    // }
    // return user
  }
}
