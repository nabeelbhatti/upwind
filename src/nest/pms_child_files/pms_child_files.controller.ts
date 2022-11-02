import { PmsChildFilesService } from './pms_child_files.service';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Request,
  Response,
  HttpStatus,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';

@Controller('pms-child-files')
export class PmsChildFilesController {
  constructor(private pmsChildFilesService: PmsChildFilesService) { }

  @Get('/getFilesByParentFileId/:id')
  async getFilesByParentFileId(@Param('id') id: string, @Response() res) {
    try {
      const childFiles = await this.pmsChildFilesService.getFilesByParentFileId(
        id,
      );
      res.status(HttpStatus.OK).json(childFiles);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: getFilesByParentFileId error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Post('createChildFileForProject')
  async createChildFileForProject(@Body() body: any, @Response() res) {
    try {
      const savedData = await this.pmsChildFilesService.create(body);
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: createChildFileForProject error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Put('updateChildFileById/:id')
  async updateChildFileById(
    @Param('id') id: string,
    @Body() body: any,
    @Response() res,
  ) {
    try {
      const updatedData = await this.pmsChildFilesService.update(id, body);
      res.status(HttpStatus.OK).json(updatedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: updateChildFileById error: ${error.message}`,
        trace: error,
      });
    }
  }
  @Put('updateChildFileForManualSourceById/:id')
  async updateChildFileForManualSourceById(
    @Param('id') id: string,
    @Body() body: any,
    @Response() res,
  ) {
    try {
      const updatedData = await this.pmsChildFilesService.updateChildFile(id, body);
      res.status(HttpStatus.OK).json(updatedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: updateChildFileById error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Delete('/deleteChildFileByID/:id')
  async deleteChildFileByID(@Param('id') id: string, @Response() res) {
    try {
      const abc = await this.pmsChildFilesService.delete(id);
      res.status(HttpStatus.OK).json(abc);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: deleteChildFileByID error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Post('getAllChildsByParentIdArray')
  async getAllChildsByParentIdArray(@Request() req, @Response() res) {
    try {
      const childArray = await this.pmsChildFilesService.getAllChildsByParentIdArray(req.body);
      res.status(HttpStatus.OK).json(childArray);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: deleteChildFileByID error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Post('compareChildFiles/:projectId')
  async compareChildFilesWithSourceFiles(@Param('projectId') parentId: string, @Response() res) {
    try {
      const data = await this.pmsChildFilesService.compareFiles(parentId);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: deleteChildFileByID error: ${error.message}`,
        trace: error,
      })
    }
  }
}
