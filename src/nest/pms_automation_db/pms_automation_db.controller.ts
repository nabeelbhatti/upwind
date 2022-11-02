import { PmsDbService } from './pms_automation_db.service';
import {
  Controller,
  Get,
  Request,
  Response,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('pms_automation_db')
@UseGuards(JwtAuthGuard)
export class PmsDbController {
  constructor(private readonly pmsDbService: PmsDbService) {}

  @Get()
  async getAutomationData(@Request() req, @Response() res) {
    try {
      const data = await this.pmsDbService.findAll();
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
