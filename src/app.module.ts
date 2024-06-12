import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigService } from 'src/configs/config.service'
import { DatabaseModule } from 'src/database/database.module'
import { UsersModule } from './users/users.module'
import { QueryModule } from 'src/query/query.module'
@Module({
  imports: [AuthModule, ConfigService, DatabaseModule.forRoot(), QueryModule, UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
