import { SpearsService } from './pms_machinery_spears.service';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('machinery_spears')
@UseGuards(JwtAuthGuard)
export class SpearsController {
  constructor(private readonly spearsService: SpearsService) {}

  @Get()
  async getSpears(@Request() req, @Response() res) {
    try {
      const data = await this.spearsService.findAll( req.query);
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createSpears(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.spearsService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Spears' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
