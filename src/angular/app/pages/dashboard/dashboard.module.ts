import { NgModule } from '@angular/core';
import { FormioModule } from '@formio/angular';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormioModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
