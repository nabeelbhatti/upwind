import { PmsProjectServices } from './pms_project.service';
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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

// import { getMongoManager } from "typeorm";
// import { Vessel } from "../../entities/vessels.entity";

@Controller('pms_project')
// @UseGuards(JwtAuthGuard)
export class PmsProjectController {
  constructor(private readonly vesselService: PmsProjectServices) { }

  @Get()
  async getPmsProject(
    @Request() req,
    @Response() res,
    @Query() query: { name: string },
  ) {
    try {
      const data:any = await this.vesselService.findAll(query?.name);
      data.forEach((element: any, i: any) => {
        element.assigneeName = ''
        element.assignee.forEach((assigneeObj: any) => {
          element.assigneeName = element.assigneeName + assigneeObj.name + ', '
        })
        element.assigneeName = element.assigneeName.slice(0, -2);
      })
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post('UpdatePmsFieldsFromVessel/:id')
  async UpdatePmsFieldsFromVessel(@Request() req, @Response() res) {
    try {
      const Body = req.body;
      const responseData = await this.vesselService.UpdatePmsFieldsFromVessel(Body);
      res.status(HttpStatus.CREATED).json(responseData);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }

  @Post()
  async CreatePmsProject(@Request() req, @Response() res) {
    try {
      if (req.body) {
        const responseData = await this.vesselService.create(req.body);
        this.vesselService.getResfreshDate(responseData._id);
        res.status(HttpStatus.CREATED).json(responseData);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Pms_Project' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }

  @Post('GetParticualrVesselInformationFromPmsProject')
  async GetParticualrVesselInformationFromPmsProject(@Request() req, @Response() res) {
    try {
      const responseData = await this.vesselService.GetParticualrVesselInformationFromPmsProject(req.body);
      res.status(HttpStatus.CREATED).json(responseData);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }

  @Delete(':id')
  async deletePmsProject(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.vesselService.deleteById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Pms_Project' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }

  @Get(':id')
  async getPmsProjectById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.vesselService.getById(req.params.id);
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Pms_Project' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Put(':id')
  async updatePmsProject(@Request() req, @Response() res) {
    try {
      console.log(req.body)
      console.log(req.params)
      if (req.params.id) {
        const data = await this.vesselService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json({ Message: 'Updated Successfuly', Data: data });
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Pms_Project' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Patch(':id')
  async updatePmsProjectById(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        const data = await this.vesselService.updateById(
          req.params.id,
          req.body,
        );
        res.status(HttpStatus.OK).json(data);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Pms_Project Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get('download/:id/:fileName')
  async getDownload(@Request() req, @Response() res) {
    const { id, fileName } = req.params;
    try {

      if (id && fileName) {
        // await this.vesselService.updateById(
        //     id,
        //     {
        //       lastDownloadedDate : new Date()
        //     }
        // );
        res.status(HttpStatus.OK).sendFile(`/${fileName}`, {
          root: '/home/upwind/pms_automation_spares/output',
        });
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Download Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Get('refresh/:id')
  async getRefresh(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        await this.vesselService.getResfreshDate(req.params.id);
        res
          .status(HttpStatus.OK)
          .json({ message: 'Pms Project screening started' });
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Please Provide Refresh Id' });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }
}
