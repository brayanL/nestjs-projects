import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

//Custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Executed in responses.
    return handler.handle().pipe(
      map((data: any) => {
        // Applied dto transformation to outcoming data.
        // plainToClass: https://github.com/typestack/class-transformer#plaintoclass
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // it's help us to exclude values not marked as expose.
        });
      }),
    );
  }
}
