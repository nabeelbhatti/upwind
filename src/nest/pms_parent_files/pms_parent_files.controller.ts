import { PmsParentFilesService } from './pms_parent_files.service';
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
  Param,
} from '@nestjs/common';
//   import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('pms-parent-files')
export class PmsParentFilesController {
  constructor(private PmsParentFilesService: PmsParentFilesService) {}

  @Post('createParentFileForProject')
  async createParentFileForProject(@Request() req, @Response() res) {
    try {
      const savedData = await this.PmsParentFilesService.create(req.body);
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsParentFilesController Method: createParentFileForProject error: ${error.message}`,
        trace: error,
      });
    }
  }

  // getParentFilesByProjectId(projectId, type = ‘Source Manual’ | ‘Manual List’ | ‘Machinery Particular’)
  @Get('getParentFilesByProjectId/:id/:type')
  async getParentFilesByProjectId(@Request() req, @Response() res) {
    try {
      const savedData = await this.PmsParentFilesService.getParentFileById(
        req.params.id,
        req.params.type,
      );
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsParentFilesController Method: getParentFilesByProjectId error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Get('getParentFileById/:id')
  async getParentFileById(@Request() req, @Response() res) {
    try {
      const savedData = await this.PmsParentFilesService.getSingleParentFileById(
        req.params.id,
      );
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsParentFilesController Method: getParentFilesByProjectId error: ${error.message}`,
        trace: error,
      });
    }
  }

  // updateParentFileById(detailObj: PMS_PARENT_FILES)
  @Post('updateParentFileById/:id')
  async updateParentFileById(@Request() req, @Response() res) {
    try {
      const pmsParentFileId = req.params.id;
      const detailObj = req.body;
      const savedData = await this.PmsParentFilesService.updateParentFileById(
        pmsParentFileId,
        detailObj,
      );
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsParentFilesController Method: updateParentFileById error: ${error.message}`,
        trace: error,
      });
    }
  }

  // deleteParentFileByID(id)
  @Delete('deleteParentFileByID/:id')
  async deleteParentFileByID(@Request() req, @Response() res) {
    try {
      const pmsParentFileId = req.params.id;
      const savedData = await this.PmsParentFilesService.deleteParentFileByID(
        pmsParentFileId,
      );
      res.status(HttpStatus.OK).json(savedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsParentFilesController Method: deleteParentFileByID error: ${error.message}`,
        trace: error,
      });
    }
  }

  
  @Patch('extractParentFileForProject/:id')
  async updateParentFileStatus(
    @Param('id') id: string,
    @Response() res,
  ) {
    console.log(id)
    try {
      const updatedData = await this.PmsParentFilesService.update(id);
      res.status(HttpStatus.OK).json(updatedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: updateChildFileById error: ${error.message}`,
        trace: error,
      });
    }
  }

  @Patch('startParentFileForProject/:id')
  async updateStatus(
    @Param('id') id: string,
    @Response() res,
  ) {
    console.log(id)
    try {
      const updatedData = await this.PmsParentFilesService.updateStatus(id);
      res.status(HttpStatus.OK).json(updatedData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Error - Class: PmsChildFilesController Method: updateChildFileById error: ${error.message}`,
        trace: error,
      });
    }
  }
}
