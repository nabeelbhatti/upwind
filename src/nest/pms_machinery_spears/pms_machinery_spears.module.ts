import { SpearsService } from './pms_machinery_spears.service';
import { SpearsController } from './pms_machinery_spears.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spears } from 'src/entities/machinery_spares.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Spears])],
  controllers: [SpearsController],
  providers: [SpearsService],
})
export class SpearsModule {}
