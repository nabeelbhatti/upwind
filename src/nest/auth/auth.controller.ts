import { UserService } from './auth.service';
import {
  Controller,
  Post,
  Request,
  Response,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @UseInterceptors(TokenInterceptor)
  async register(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const data = await this.userService.create(req.body);
        const jwt = await this.jwtService.signAsync({ data });
        data.token = jwt;
        const { password, ...result } = data;
        res.status(HttpStatus.OK).json(result);
      }
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response() res) {
    try {
      res.status(HttpStatus.OK).json(req.user);
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).json({
        trace: err,
      });
    }
  }
}
