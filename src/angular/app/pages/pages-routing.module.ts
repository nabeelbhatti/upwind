import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPMSProjectComponent } from '../components/all-pms-project/all-pms-project.component';
import { PMSProjectDetailComponent } from '../components/pms-project-detail/pms-project-detail.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryTypesComponent } from '../components/category-types/category-types.component';
import { ProjectOverviewComponent } from '../components/project-overview/project-overview.component';
import { VesselInformationComponent } from '../components/vessel-information/vessel-information.component';
import { FleetStandardDocumentsComponent } from '../components/fleet-standard-documents/fleet-standard-documents.component';
import { MachineryParticularComponent } from '../components/machinery-particular/machinery-particular.component';
import { ViewDataComponent } from '../components/machinery-particular/view-machinery-data/view-data.component';
import { ManualIndexComponent } from './manual-index/manual-index.component';
import { ManualIndexPdfComponent } from '../components/manual-index-pdf/manual-index-pdf.component';
import { SourceManualComponent } from '../components/source-manual/source-manual.component';
import { GeneralLibrariesComponent } from '../components/general-libraries/general-libraries.component';
import { ScreeningReportsComponent } from '../components/screening-reports/screening-reports.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: AllPMSProjectComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'projects',
        component: AllPMSProjectComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'projects/:id',
        component: PMSProjectDetailComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'libraries',
        component: CategoriesComponent,
      },
      {
        path: 'libraries/general-libraries',
        component: GeneralLibrariesComponent,
      },
      {
        path: 'project-overview',
        component: ProjectOverviewComponent,
      },
      {
        path: 'librarytypes',
        component: CategoryTypesComponent,
      },
      {
        path:"source-manual",
        component: SourceManualComponent,
      },
      {
        path: 'vessel-information',
        component: VesselInformationComponent,
      },
      {
        path: 'manual-index',
        component: ManualIndexComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manual-index-pdf/:id',
        component: ManualIndexPdfComponent,
        canActivate: [AuthGuard],
      },
      {
        path:"screening-report",
        component:ScreeningReportsComponent,
      },
      {
        path:'fsd',
        component: FleetStandardDocumentsComponent
      },
      {
        path:'machinery-particular',
        component: MachineryParticularComponent
      },
      {
        path:'view-data',
        component: ViewDataComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
