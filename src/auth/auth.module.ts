import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './passports/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './passports/jwt.strategy'
import { ConfigService } from 'src/configs/config.service'
import { ConfigModule } from 'src/configs/config.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.getConfigService('jwt').JWT_ACCESS_TOKEN_SECRET_KEY,
        signOptions: {
          expiresIn: configService.getConfigService('jwt').JWT_ACCESS_TOKEN_EXPIRATION_TIME
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
