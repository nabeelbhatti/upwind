import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { ClientDocType } from "src/entities/client_doc_type.entity";
import { MongoRepository } from "typeorm";

Injectable
export class ClientDocTypeService {
    constructor(@InjectRepository(ClientDocType)
    private readonly clientDocTypeRepository: MongoRepository<ClientDocType>) { }

    async findAll(id) {
        return await this.clientDocTypeRepository.find({
            where: {
                "client._id": id
            }
        })
    }

    async createMany(inputArr: ClientDocType[] | any): Promise<ClientDocType[] | any> {
        const entityArr: ClientDocType[] = [];
        inputArr.forEach(res => {
            let entityObj = new ClientDocType();
            entityObj = { ...entityObj, ...res }
            entityArr.push(entityObj);
        })
        return await this.clientDocTypeRepository.insertMany(entityArr);
    }

    async updateClientDocById(id, body: ClientDocType | any): Promise<ClientDocType | any> {
        let existingDoc = await this.clientDocTypeRepository.findOneBy({
            _id: new ObjectId(id),
        });
        existingDoc = {
            ...existingDoc,
            row_activity: {
                ...existingDoc.row_activity,
                modification_date: new Date()
            },
            ...body
        }
        delete existingDoc._id;
        return await this.clientDocTypeRepository.updateOne({ _id: new ObjectId(id) }, { $set: existingDoc });
    }
}