import { IConfigService } from 'src/interfaces/Common.interface'

export class ConfigService {
  private configService: IConfigService = {
    postgres: {
      POSTGRES_USERNAME: 'postgres',
      POSTGRES_PASSWORD: 'admin001',
      POSTGRES_HOST: 'localhost',
      POSTGRES_PORT: 5432,
      POSTGRES_DATABASE: 'postgres'
    },
    jwt: {
      JWT_ACCESS_TOKEN_SECRET_KEY: 'secretKey',
      JWT_ACCESS_TOKEN_EXPIRATION_TIME: '60s',
      ACCESS_TOKEN_EXPIRATION_TIME: '60s',
      ACCESS_TOKEN_SECRET_KEY: 'secretKey'
    }
  }

  getConfigService<T extends keyof IConfigService>(key: T): IConfigService[T] {
    return this.configService[key]
  }
}
