import { ManagerService } from './pms_manager.service';
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

@Controller('manager')
@UseGuards(JwtAuthGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  async getStatus(@Request() req, @Response() res) {
    try {
      const data = await this.managerService.findAll();
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post()
  async createStatus(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.managerService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Status' });
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
        const data = await this.managerService.deleteById(req.params.id);
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

  @Get(':id')
  async getStatusById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.managerService.getById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide status Id' });
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
        const data = await this.managerService.updateById(
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
        const data = await this.managerService.updateById(
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
