import { Global, Module } from '@nestjs/common'
import { ConfigService } from 'src/configs/config.service'

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
