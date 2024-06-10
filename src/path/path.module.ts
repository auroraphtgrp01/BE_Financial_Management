import { Global, Module } from '@nestjs/common'
import { PathService } from 'src/path/path.service'

@Global()
@Module({
  providers: [PathService],
  exports: [PathService]
})
export class PathModule {}
