import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { PathService } from 'src/path/path.service'
import { resolveSql } from 'src/database/resolveSql'
import { of, switchMap } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly pathService: PathService
  ) {}
  create() {
    const sqlPathToQueryById = this.pathService.getPath('users', 'findUserById')
    const sqlRaw = resolveSql(sqlPathToQueryById, true) as string
    const queryClause = 'id = 2'
    return of(sqlRaw.replace('{ WHERE_CLAUSE }', queryClause)).pipe(switchMap((sql) => this.databaseService.query(sql)))
  }
}
