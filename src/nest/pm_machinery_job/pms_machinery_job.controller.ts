import { JobService } from './pms_machinery_job.service';
import {
  Controller,
  Get,
  Request,
  Response,
  HttpStatus,
  UseGuards,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('machiney_job')
@UseGuards(JwtAuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getJob(@Request() req, @Response() res) {
    try {
      const data = await this.jobService.findAll(
        req.query
      );
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createJob(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.jobService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Job Data' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
