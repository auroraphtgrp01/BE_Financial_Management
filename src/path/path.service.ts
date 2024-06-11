import { basePath, pathSql } from 'src/constants/pathSql.constants'
import { IPathService } from 'src/interfaces/Common.interface'

export class PathService {
  private pathService: IPathService = pathSql
  getPath<T extends keyof IPathService, K extends keyof IPathService[T]>(key: T, target: K): IPathService[T][K] {
    return this.pathService[key][target]
  }
  getAllEntities(): (keyof IPathService)[] {
    return Object.keys(basePath) as (keyof IPathService)[]
  }
}
