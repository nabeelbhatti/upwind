import { GeneralLibrariesService } from './general-libraries.service';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';

@Controller('general-libraries')
export class GeneralLibrariesController {
  constructor(private readonly managerService: GeneralLibrariesService) {}

  @Get('list')
  async getAllowedLibraryTypes() {
    return this.managerService.getAllowedTypes();
  }

  @Get(':type')
  async getlLibraryItems(
    @Request() req,
    @Response() res
  ) {
    try {
      const data = await this.managerService.find(req.params.type);
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post(':type')
  async createUpdateLibraryItem(@Request() req, @Response() res) {
    try {
      if (req.body && req.params.type) {
        if (req.body._id) {
          const responseData = await this.managerService.update(req.params.type, req.body)
          res.status(HttpStatus.OK).json(responseData);
        } else {
          const responseData = await this.managerService.create(req.params.type, req.body);
          res.status(HttpStatus.CREATED).json(responseData);
        } 
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Lib Type' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err.message,
      });
    }
  }

  @Delete(':type/:id')
  async deleteLibraryItem(@Request() req, @Response() res) {
    try {
      if (req.params.id && req.params.type) {
        const data = await this.managerService.deleteById(req.params.type, req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Lib Type' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err,
      });
    }
  }
}
