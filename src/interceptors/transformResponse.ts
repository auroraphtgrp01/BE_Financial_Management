import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'
import { filterObject } from 'src/utils/filterObject'
export interface Response {
  statusCode: number
  message: string
  data: any
}

const keysToRemove = ['createdAt', 'updatedAt', 'deletedAt', 'updatedBy', 'createdBy', 'password', 'deletedBy']
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message || '',
        data: filterObject(data?.data || data, keysToRemove)
      }))
    )
  }
}
