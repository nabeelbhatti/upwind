import { OcrService } from './ocr_results.service';
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
import { readFileSync } from 'fs';

@Controller('ocr_result')
@UseGuards(JwtAuthGuard)
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Get()
  async getResult(@Request() req, @Response() res) {
    try {
      const data = await this.ocrService.findAll(req.query.projectId);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post(':id')
  async createResultById(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.ocrService.createJob(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Job Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post('spares/:id')
  async createSpearsById(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.ocrService.createSpears(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Spears Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post('jobs/delete/:id')
  async deleteJobsById(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.ocrService.deleteJobs(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide List Of Delete Jobs' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post('spares/delete/:id')
  async deleteSpearsById(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.ocrService.deleteSpears(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide List Of Delete Spears' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get('files')
  async readfile(@Request() req, @Response() res) {
    try {
      const url = await decodeURIComponent(req.query.path)
      const data = readFileSync(`${url}`);
      res.contentType('application/pdf');
      res.send(data);
    } catch (err) {}
  }
}
