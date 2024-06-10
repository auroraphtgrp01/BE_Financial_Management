export interface IConfigService extends DynamicType {
    postgres: {
        POSTGRES_USERNAME: string
        POSTGRES_PASSWORD: string
        POSTGRES_HOST: string
        POSTGRES_PORT: number
    },
    jwt: {
        JWT_ACCESS_TOKEN_SECRET_KEY: string
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: string,
    }
}

export interface DynamicType {
    [key: string]: any
}