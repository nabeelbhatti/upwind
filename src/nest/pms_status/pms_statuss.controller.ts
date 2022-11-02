import { StatusService } from './pms_status.service';
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

@Controller('status')
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async getStatus(@Request() req, @Response() res) {
    try {
      const data = await this.statusService.findAll();
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createStatus(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.statusService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Vessel Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err,
      });
    }
  }

  @Delete(':id')
  async deleteVessel(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.statusService.deleteById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Status Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err,
      });
    }
  }

  @Get(':id')
  async getStatusById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.statusService.getById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Status Id' });
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
        const data = await this.statusService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Status Id' });
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
        const data = await this.statusService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Status Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
