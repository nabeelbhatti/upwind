import { ClientServices } from './clients.service';
import {
  Controller,
  Get,
  HttpStatus,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientServices) {}

  @Get()
  async getClient(@Request() req, @Response() res) {
    try {
      const data = await this.clientService.findAll();
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
