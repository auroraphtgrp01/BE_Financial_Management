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
  }
}

export interface IPathService {
  users: {
    ddl: string
  }
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
