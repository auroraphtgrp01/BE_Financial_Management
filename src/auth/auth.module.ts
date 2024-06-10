import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './passports/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './passports/jwt.strategy'
import { configService } from 'src/configs/config.services'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: configService.jwt.JWT_ACCESS_TOKEN_SECRET_KEY,
        signOptions: {
          expiresIn: configService.jwt.JWT_ACCESS_TOKEN_EXPIRATION_TIME
        }
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
