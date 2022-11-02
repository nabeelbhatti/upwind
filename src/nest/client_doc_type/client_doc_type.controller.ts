import { Controller, Get, HttpStatus, Post, Query, Request, Response } from "@nestjs/common";
import { ClientDocTypeService } from "./client_doc_type.service";

@Controller('clientDocType')
export class ClientDocTypeController {
    constructor(private readonly clientDocTypeService: ClientDocTypeService) { }
    @Post('getDocsByClient/:id')
    async getDocsByClient(@Request() req, @Response() res) {
        try {
            const data = await this.clientDocTypeService.findAll(req.params?.id);
            res.status(HttpStatus.CREATED).json(data);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: `Error - Class: clientDocTypeController, Method: createClientDodcs, Error: ${err.message}`,
                trace: err,
            });
        }
    }

    @Post('createClientDocType')
    async createClientDodcs(@Request() req, @Response() res) {
        try {
            const data = await this.clientDocTypeService.createMany(req.body);
            res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: `Error - Class: clientDocTypeController, Method: createClientDodcs, Error: ${error.message}`,
                trace: error,
            });
        }
    }
    @Post('updateClientDocType/:id')
    async updateClientDodcs(@Request() req, @Response() res) {
        try {
            const data = await this.clientDocTypeService.updateClientDocById(req.params?.id, req.body);
            res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: `Error - Class: clientDocTypeController, Method: updateClientDodcs, Error: ${error.message}`,
                trace: error,
            });
        }
    }
}