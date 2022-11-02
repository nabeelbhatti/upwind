import { CategoryService } from './categories.service';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('category')
// @UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly managerService: CategoryService) {}

  @Get()
  async getStatus(
    @Request() req,
    @Response() res,
    @Query() query: { type: string },
  ) {
    try {
  
      const data = await this.managerService.findAll(query?.type);
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get('getAll')
  async getAll(
    @Request() req,
    @Response() res
  ) {
    try {
  
      const data = await this.managerService.findAllCategories();
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }

 
  @Post()
  async createStatus(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.managerService.create(req.body);
        res.status(HttpStatus.CREATED).json(responseData);
        console.log(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Vessel Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Somthing Went Wrong',
        trace: err.message,
      });
    }
  }

  @Delete(':id')
  async deleteCategoryAndSubCategory(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.managerService.deleteById(req.params.id);
        res.status(HttpStatus.OK).json(data);
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
}
