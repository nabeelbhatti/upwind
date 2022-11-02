import { GeneralLibrariesService } from './general-libraries.service';
import { GeneralLibrariesController } from './general-libraries.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GeneralLibrariesController],
  providers: [GeneralLibrariesService],
})
export class GeneralLibrariesModule {}
