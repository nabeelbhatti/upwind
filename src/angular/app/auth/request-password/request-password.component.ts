import { Component, OnInit } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css'],
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
  user: any = {
    email: 'pms@jibe.solutions',
  };

  requestPassword(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.requestPassword(this.strategy, this.user).subscribe(result => {
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
