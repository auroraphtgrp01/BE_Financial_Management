import { Inject, Injectable } from '@nestjs/common'
import { Pool } from 'pg'
import { Observable, finalize, from, map, switchMap, catchError, mergeMap, of } from 'rxjs'
import { resolveSql } from 'src/database/resolveSql'
import { IMigrateParams } from 'src/interfaces/Common.interface'
import { QueryService } from 'src/query/query.service'

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('PG_POOL') private readonly pgService: Pool,
    private readonly queryService: QueryService
  ) {}
  query(sql: string, params?: any[]): Observable<any[]> {
    return from(this.pgService.connect()).pipe(
      switchMap((ins) => {
        return from(ins.query(sql, params)).pipe(
          map((res) => res.rows),
          finalize(() => ins.release())
        )
      })
    )
  }
  queryByFile(fileName: string, params?: any) {
    const queryString = resolveSql(fileName, true) as string
    return this.query(queryString, params)
  }
  queryByFilter(sql: string) {
    return this.pgService.query(sql)
  }
  migrate(option: IMigrateParams) {
    const keyofMigrateDDL = this.queryService.getAllEntities()
    if (option.isDDL) {
      of(...keyofMigrateDDL)
        .pipe(
          mergeMap((key) =>
            this.queryByFile(this.queryService.getPath(key, 'ddl')).pipe(
              catchError((error) => {
                console.error(`Error migrating ${key} DDL: ${error.message}`)
                return of(null)
              })
            )
          )
        )
        .subscribe({
          error: (error) => {
            console.error('Error during migration:', error)
            return 'Error during migration' + error
          },
          complete: () => {
            console.log('Migration completed successfully')
          }
        })
    }
  }
}
