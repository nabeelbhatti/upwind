import { ScreeningReportService } from './screening_report.service';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';

@Controller('screening_report')
export class ScreeningReportController {
  constructor(private readonly stageService: ScreeningReportService) {}

  @Post(':project_id')
  async createScreeningReport(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.stageService.create(
          req.body,
          req.params.project_id,
        );
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide ProjectId' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get(':id')
  async getScreeningReportByID(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.stageService.getById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide stage Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get('project/:project_id')
  async getScreeningResultByProjectId(@Request() req, @Response() res) {
    try {
      if (req.params.project_id) {
        const data = await this.stageService.getByProjectId(
          req.params.project_id,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide stage Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
