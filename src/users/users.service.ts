import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { resolveSql } from 'src/database/resolveSql'
import { of, switchMap } from 'rxjs'
import { QueryService } from 'src/query/query.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly queryService: QueryService
  ) {}
  create() {
    const sqlPathToQueryById = this.queryService.getPath('users', 'findUserById')
    const sqlRaw = resolveSql(sqlPathToQueryById, true) as string
    const queryClause = 'id = 2'
    return of(sqlRaw.replace('{ WHERE_CLAUSE }', queryClause)).pipe(switchMap((sql) => this.databaseService.query(sql)))
  }
}
