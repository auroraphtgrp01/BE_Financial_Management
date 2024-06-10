import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Response } from 'express'
import { Public } from 'src/decorators/publicRoute'
import { IUser } from 'src/interfaces/User.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    // return await this.authService.login(user, res)
  }
}
