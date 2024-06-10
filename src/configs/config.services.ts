import { IConfigService } from "src/interfaces/Common.interface";

export const configService: IConfigService = {
    postgres: {
        POSTGRES_USERNAME: 'postgres',
        POSTGRES_PASSWORD: 'admin001',
        POSTGRES_HOST: 'localhost',
        POSTGRES_PORT: 5432,
    },
    jwt: {
        JWT_ACCESS_TOKEN_SECRET_KEY: 'secretKey',
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: '60s',
    }
}

// Object.freeze(configService)