import { VesselFileService } from './vesselFile.service';
import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseInterceptors, UploadedFiles
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
// import { getMongoManager } from "typeorm";
// import { Vessel } from "../../entities/vessels.entity";

@Controller('vesselFile')
export class VesselFileController {
  constructor(private readonly vesselFileService: VesselFileService) { }

  @Get(":id")
  async getVessels(@Request() req, @Response() res) {
    try {
      if (req.params.id) {
        res.sendFile(`/${req.params.id}`, { root: "./files" })
      } else {
        res.json({
          status: 400,
          message: 'Something Went Wrong',
        });
      }
    } catch (err) {
      res.json({
        status: 400,
        message: 'Something Went Wrong',
        trace: err,
      });
    }
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.env.FILE_DESTINATION, // './files
        filename: (req, file, cd) => {
          const ext = file.mimetype.split('/')[1]
          cd(null, `file-${Date.now()}.${ext}`)
        }
      })
    }),
  )
  async uploadFile(@UploadedFiles() file: Express.Multer.File, @Request() req, @Response() res) {
    try {
      res.json({
        status: 200,
        data: file
      })
    } catch (err) {
      res.json({
        status: 400,
        message: "Something Went Wrong",
        trace: err
      })
    }
  }
}