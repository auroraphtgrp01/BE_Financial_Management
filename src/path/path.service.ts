import { IPathService } from 'src/interfaces/Common.interface'

export class PathService {
  private basePath = {
    users: 'users'
  }

  private pathService: IPathService = {
    users: {
      ddl: `${this.basePath.users}/ddl.sql`
    },
  }

  getPath<T extends keyof IPathService, K extends keyof IPathService[T]>(key: T, target: K): IPathService[T][K] {
    return this.pathService[key][target]
  }
  getAllEntities(): (keyof IPathService)[] {
    return Object.keys(this.basePath) as (keyof IPathService)[];
  }
}
