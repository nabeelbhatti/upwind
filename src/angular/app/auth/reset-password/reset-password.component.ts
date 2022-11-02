import { Component, OnInit } from '@angular/core';
import { NbResetPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent extends NbResetPasswordComponent {
  user: any = {
    password: 'pms1234',
    confirmPassword: 'pms1234',
  };

  resetPassword(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.resetPassword(this.strategy, this.user).subscribe(result => {
      this.submitted = true;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }
      const redirect = '/pages/dashboard';
      // const redirect =
      //   sessionStorage.getItem('redirectUrl') || result.getRedirect();
      // sessionStorage.removeItem('redirectUrl');
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
