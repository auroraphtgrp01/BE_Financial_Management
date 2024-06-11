import { IPathService } from 'src/interfaces/Common.interface'

export const basePath = {
  users: 'users'
}

export const pathSql: IPathService = {
  users: {
    ddl: `${basePath.users}/ddl.sql`,
    findUserById: `${basePath.users}/findUserById.sql`,
    findAll: `${basePath.users}/findAllUser.sql`
  }
}
