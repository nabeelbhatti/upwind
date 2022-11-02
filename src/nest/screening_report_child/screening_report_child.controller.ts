import { ScreeningReportChildService } from './screening_report_child.service';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';

@Controller('screening_report_child')
export class ScreeningReportChildController {
  constructor(private readonly stageService: ScreeningReportChildService) {}

  @Post(':project_id')
  async createScreeningReportChild(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.stageService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide ParentId' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get(':id')
  async getScreeningReportChildByID(@Request() req, @Response() res) {
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

  @Delete(':id')
  async deleteScreeningReportChildById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.stageService.deleteById(req.params.id);
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

  @Get('start/comparison')
  async StartComparison(@Request() req, @Response() res) {
    try {
      // const data = await this.stageService.getById(req.params.id);
      res.status(HttpStatus.OK).json({
        message: 'ok',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
