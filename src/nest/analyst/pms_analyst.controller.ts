import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { AnalystService } from './pms_analyst.service';


@Controller('analyst')
@UseGuards(JwtAuthGuard)
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Get()
  async getAnalyst(@Request() req, @Response() res) {
    try {
      const data = await this.analystService.findAll();
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createAnalyst(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.analystService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Analyst Data' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Delete(':id')
  async deleteAnalsyt(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.analystService.deleteById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Analyst Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get(':id')
  async getAnalystById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.analystService.getById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Analyst Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Put(':id')
  async updateAnalyst(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.analystService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Analyst Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Patch(':id')
  async updateAnalystById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.analystService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Analyst Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
