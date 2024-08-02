import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap((data) => {
                const ctx = context.switchToHttp();
                const response = ctx.getResponse();

                // Yanıt yapısını oluşturmak için veri kullanın
                const message = context.switchToHttp().getRequest().message || 'Request was successful';

                response.status(HttpStatus.OK).json({
                    success: true,
                    message: message,
                    data
                });
            })
        );
    }
}
