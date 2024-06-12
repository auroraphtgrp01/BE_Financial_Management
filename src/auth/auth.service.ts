import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { catchError, forkJoin, map, mergeMap } from 'rxjs'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { ConfigService } from 'src/configs/config.service'
import { DatabaseService } from 'src/database/database.service'
import { QueryService } from 'src/query/query.service'
import { hashPassword } from 'src/utils/hashPassword'

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly queryService: QueryService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  register(registerDto: RegisterDto) {
    const sqlPath = this.queryService.getPath('users', 'insertNewUser');

    return this.databaseService
      .queryByFile(sqlPath, [
        registerDto.name,
        registerDto.email,
        hashPassword(registerDto.userPassword),
        registerDto.phoneNumber,
        registerDto.gender,
        registerDto.dateOfBirth
      ])
      .pipe(
        mergeMap((res) => {
          const payload = {
            userId: res[0].id,
            email: res[0].email,
            name: res[0].name,
            phoneNumber: res[0].phone_number
          };

          const refreshToken$ = this.jwtService.signAsync(payload, {
            secret: this.configService.getConfigService('jwt').JWT_ACCESS_TOKEN_SECRET_KEY,
            expiresIn: this.configService.getConfigService('jwt').JWT_ACCESS_TOKEN_EXPIRATION_TIME
          })
          const accessToken$ = this.jwtService.signAsync(payload, {
            secret: this.configService.getConfigService('jwt').ACCESS_TOKEN_SECRET_KEY,
            expiresIn: this.configService.getConfigService('jwt').ACCESS_TOKEN_EXPIRATION_TIME
          })

          return forkJoin([refreshToken$, accessToken$]).pipe(
            mergeMap(([refreshToken, accessToken]) => {
              const updateSqlPath = this.queryService.getPath('users', 'updateRefreshToken');
              return this.databaseService.queryByFile(updateSqlPath, [refreshToken, res[0].id]).pipe(
                map(() => ({
                  messages: 'User has been registered',
                  data: {
                    ...res[0],
                    refreshToken,
                    accessToken
                  }
                }))
              );
            })
          );
        }),
        catchError((err) => {
          if (err.code === '23505') {
            throw new BadRequestException('Email already exists');
          }
          throw err;
        })
      );
  }
}


