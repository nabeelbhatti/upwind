import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../auth.service';
import { Users } from 'src/entities/auth.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  jwtService: any;
  constructor(private authService: UserService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }
  async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.login(user);
    user.token = token;
    return user;
  }
}
