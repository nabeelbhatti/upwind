import { ClientServices } from './clients.service';
import { ClientController } from './clients.controller';
import { LibClient } from 'src/entities/clients.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LibClient])],
  controllers: [ClientController],
  providers: [ClientServices],
})
export class ClientModule {}
