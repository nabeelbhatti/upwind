import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VesselsModule } from './pms_project/pms_project.module';
import { ClientModule } from './clients/clients.module';
import { MulterModule } from '@nestjs/platform-express';
import { VesselFileModule } from './vesselFile/vesselFile.module';
import { ConfigModule } from '@nestjs/config';
import { PmsDbModule } from './pms_automation_db/pms_automation_db.module';
import { PmsSpareModule } from './pms_automation_spare/pms_automation_spare.module';
import { UserModule } from './auth/auth.module';
import { StatusModule } from './pms_status/pms_status.module';
import { StageModule } from './pms_stage/pms_stage.module';
import { ManagerModule } from './manager/pms_manager.module';
import { AnalystModule } from './analyst/pms_analyst.module';
import { TypesModule } from './types/types.module';
import { CategoryModule } from './categories/categories.module';
import { OcrModule } from './ocr_results/ocr_results.module';
import { JobModule } from './pm_machinery_job/pms_machinery_job.module';
import { SpearsModule } from './pms_machinery_spears/pms_machinery_spears.module';
import { ClientDocTypeModule } from './client_doc_type/client_doc_type.module';
import { PmsParentFilesModule } from './pms_parent_files/pms_parent_files.module';
import { PmsChildFilesModule } from './pms_child_files/pms_child_files.module';
import { ScreeningReportModule } from './screening_report/screening_report.module';
import { ScreeningReportChildModule } from './screening_report_child/screening_report_child.module';
// @Dependencies(Connection)
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE,
      entities: [__dirname + '/../**/*.entity.js'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
    }),
    VesselsModule,
    ClientModule,
    MulterModule.register({ dest: process.env.FILE_DESTINATION }),
    VesselFileModule,
    PmsDbModule,
    PmsSpareModule,
    UserModule,
    StatusModule,
    StageModule,
    ManagerModule,
    AnalystModule,
    TypesModule,
    CategoryModule,
    OcrModule,
    JobModule,
    SpearsModule,
    ClientDocTypeModule,
    PmsParentFilesModule,
    PmsChildFilesModule,
    ScreeningReportModule,
    ScreeningReportChildModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(connection){
  //   this.connection = connection
  // }
}
