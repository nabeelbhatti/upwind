import { PmsSpareService } from './pms_automation_spare.service';
import {
  Controller,
  Get,
  Request,
  Response,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('pms_automation_spare')
@UseGuards(JwtAuthGuard)
export class PmsSpareController {
  constructor(private readonly pmsSpareService: PmsSpareService) {}

  @Get()
  async getVessels(
    @Request() req,
    @Response() res,
    @Query() query: { vessel_id: string },
  ) {
    try {
      const data = await this.pmsSpareService.findAll(query?.vessel_id);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
