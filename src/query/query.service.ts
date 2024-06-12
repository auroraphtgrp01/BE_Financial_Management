import { pathSql, basePath } from 'src/constants/querySql.constants'
import { IQueryService } from 'src/interfaces/Common.interface'

export class QueryService {
  private queryService: IQueryService = pathSql
  getPath<T extends keyof IQueryService, K extends keyof IQueryService[T]>(key: T, target: K): IQueryService[T][K] {
    return this.queryService[key][target]
  }
  getAllEntities(): (keyof IQueryService)[] {
    return Object.keys(basePath) as (keyof IQueryService)[]
  }
}
