import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import type { Users } from 'src/entities/auth.entity';
  import { UserService } from '../auth.service';

 
@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Users>,
  ): Observable<Users> {
    return next.handle().pipe(
      tap((user) => {
        console.log(user)
        // const response = context.switchToHttp().getResponse<Response>();
        // const token = this.authService.signToken(user);
        // response.setHeader('Authorization', `Bearer ${token}`);
        // response.cookie('token', token, {
        //   httpOnly: true,
        //   signed: true,
        //   sameSite: 'strict',
        //   secure: process.env.NODE_ENV === 'production',
        // });
        return user;
      }),
    );
  }
}