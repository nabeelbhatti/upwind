import { StageService } from './pms_stage.service';
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

@Controller('stage')
@UseGuards(JwtAuthGuard)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  async getStage(@Request() req, @Response() res) {
    try {
      const data = await this.stageService.findAll();
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createStage(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.stageService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
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
  async deleteVessel(@Request() req, @Response() res) {
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

  @Get(':id')
  async getStatusById(@Request() req, @Response() res) {
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

  @Put(':id')
  async updateStatus(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.stageService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Stage Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Patch(':id')
  async updateStatusById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.stageService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Stage Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
