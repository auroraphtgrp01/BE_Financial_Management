export interface IConfigService {
  postgres: {
    POSTGRES_USERNAME: string
    POSTGRES_PASSWORD: string
    POSTGRES_HOST: string
    POSTGRES_PORT: number
    POSTGRES_DATABASE: string
  }
  jwt: {
    JWT_ACCESS_TOKEN_SECRET_KEY: string
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: string
    ACCESS_TOKEN_EXPIRATION_TIME: string
    ACCESS_TOKEN_SECRET_KEY: string
  }
}

export interface IPathService {
  users: IQueryUserOptions
}

export interface IQueryUserOptions extends IQueryOptions {
  findUserById?: string
}

export interface IQueryOptions {
  ddl: string
  findAll?: string
  findOne?: string
  create?: string
  update?: string
  delete?: string
}

export interface IMigrateParams {
  isDDL?: boolean
  isData?: boolean
}

export interface basePath {
  users: string
}
export interface DynamicType {
  [key: string]: any
}
