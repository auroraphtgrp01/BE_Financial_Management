import { Controller, Get, Query } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { IMigrateParams } from 'src/interfaces/Common.interface'

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
  @Get('migrate')
  migrateDatabase(@Query() query: IMigrateParams) {
    return this.databaseService.migrate(query)
  }
}
