import { IQueryService } from 'src/interfaces/Common.interface'

export const basePath = {
  users: 'users'
}

export const pathSql: IQueryService = {
  users: {
    ddl: `${basePath.users}/ddl.sql`,
    findUserById: `${basePath.users}/findUserById.sql`,
    findAll: `${basePath.users}/findAllUser.sql`,
    insertNewUser: `${basePath.users}/insertNewUser.sql`,
    updateRefreshToken: `${basePath.users}/updateRefreshToken.sql`
  }
}
