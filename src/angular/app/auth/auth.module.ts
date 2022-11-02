import { CommonModule } from '@angular/common';
import { NgModule, Provider, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { environment } from './../../environment/environment';

import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';

import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';

import { accessControl } from './access-control';
import { RoleProvider } from '../services/role-provider.service';
import { AuthGuard } from '../services/auth-guard.service';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
export function tokenInterceptorFilter(req: HttpRequest<any>) {
  if (req.url === 'api/auth/login' || req.url === 'api/auth/refresh-token') {
    return true;
  }
  return false;
}

export const AUTH_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'api/auth/',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
      }),
    ],
  }).providers,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NbAuthJWTInterceptor,
    multi: true,
  },
  {
    provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    useValue: tokenInterceptorFilter,
  },

  NbSecurityModule.forRoot({
    accessControl,
  }).providers,
  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
  },

  AuthGuard,
];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
    NbAuthModule,
    NgxAuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: `${environment.apiURL}/api/`,
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),
      ],
    }),
  ],
  exports: [NbAuthModule],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class NgxAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxAuthModule,
      providers: [...AUTH_PROVIDERS],
    };
  }
}
