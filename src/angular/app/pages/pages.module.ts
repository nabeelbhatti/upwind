import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PmsFilesModule } from './pms-files/pms-files.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { TabModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import {
  PageService,
  SortService,
  FilterService,
  GroupService,
} from '@syncfusion/ej2-angular-grids';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  DropDownListModule,
  MultiSelectAllModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormioModule } from '@formio/angular';
import { PMSProjectsComponent } from './pms-projects/pms-projects.component';
import { AllPMSProjectComponent } from '../components/all-pms-project/all-pms-project.component';
import { PMSProjectDetailComponent } from '../components/pms-project-detail/pms-project-detail.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryTypesComponent } from '../components/category-types/category-types.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { MainComponent } from '../components/main/main.component';
import { JobsComponent } from '../components/jobs/jobs.component';
import { SparesComponent } from '../components/spares/spares.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProjectOverviewComponent } from '../components/project-overview/project-overview.component';
import { VesselInformationComponent } from '../components/vessel-information/vessel-information.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FleetStandardDocumentsComponent } from '../components/fleet-standard-documents/fleet-standard-documents.component';
import { MachineryParticularComponent } from '../components/machinery-particular/machinery-particular.component';
import { ViewDataComponent } from '../components/machinery-particular/view-machinery-data/view-data.component';
import { ManualIndexComponent } from './manual-index/manual-index.component';
import { ManualIndexPdfComponent } from '../components/manual-index-pdf/manual-index-pdf.component';
import { SourceManualComponent } from '../components/source-manual/source-manual.component';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { GeneralLibrariesComponent } from '../components/general-libraries/general-libraries.component';
import { ScreeningReportsComponent } from '../components/screening-reports/screening-reports.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    FormioModule,
    GridModule,
    PmsFilesModule,
    ReactiveFormsModule,
    ProgressBarModule,
    NbEvaIconsModule,
    DropDownListModule,
    DialogModule,
    TreeViewModule,
    MultiSelectModule,
    PdfViewerModule,
    TabModule,
    AccordionModule,
    InfiniteScrollModule,
    MultiSelectAllModule,
    CheckBoxModule,
    SplitterModule,
    BreadcrumbModule
  ],
  declarations: [
    PagesComponent,
    AllPMSProjectComponent,
    PMSProjectsComponent,
    PMSProjectDetailComponent,
    CategoriesComponent,
    CategoryTypesComponent,
    GeneralLibrariesComponent,
    MainComponent,
    JobsComponent,
    SparesComponent,
    ProjectOverviewComponent,
    VesselInformationComponent,
    FleetStandardDocumentsComponent,
    MachineryParticularComponent,
    ViewDataComponent,
    ManualIndexComponent,
    ManualIndexPdfComponent,
    SourceManualComponent,
    ScreeningReportsComponent
  ],
  providers: [PageService, SortService, FilterService, GroupService],
})
export class PagesModule {}
