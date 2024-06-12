import { Global, Module } from '@nestjs/common'
import { QueryService } from 'src/query/query.service'

@Global()
@Module({
  providers: [QueryService],
  exports: [QueryService]
})
export class QueryModule {}
