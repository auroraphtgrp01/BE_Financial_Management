import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ErrorHandlingInterceptor } from 'src/interceptors/errorHandling'
import * as cookieParser from 'cookie-parser'
import { TransformInterceptor } from 'src/interceptors/transformResponse'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization'
  })
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ErrorHandlingInterceptor())
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Financial Management API')
    .setVersion('1.0')
    .addTag('financial-management')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(4000)
}
bootstrap()
