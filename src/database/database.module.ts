import { DynamicModule, Global, Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { Pool, PoolConfig } from 'pg'
import { ConfigService } from 'src/configs/config.service'
import { ConfigModule } from 'src/configs/config.module'
import { DatabaseController } from 'src/database/database.controller'

@Global()
@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
  exports: [DatabaseService]
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'PG_OPTIONS',
          useFactory: (configService: ConfigService): PoolConfig => {
            const postgresConfig = configService.getConfigService('postgres')
            return {
              host: postgresConfig.POSTGRES_HOST,
              port: postgresConfig.POSTGRES_PORT,
              database: postgresConfig.POSTGRES_DATABASE,
              user: postgresConfig.POSTGRES_USERNAME,
              password: postgresConfig.POSTGRES_PASSWORD
            }
          },
          inject: [ConfigService]
        },
        {
          provide: 'PG_POOL',
          inject: ['PG_OPTIONS'],
          useFactory: (options: PoolConfig) => new Pool(options)
        }
      ],
      exports: ['PG_POOL']
    }
  }
}
