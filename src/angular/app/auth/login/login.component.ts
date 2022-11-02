import { Component } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends NbLoginComponent {

  user: any = {
    email: 'pms@jibe.solutions',
    password: 'pms1234',
  };

  ngOnInit() {
    const redirect = '/pages/dashboard';
    if (JSON.parse(localStorage.getItem('auth_app_token'))?.value) {
      setTimeout(() => {
        return this.router.navigateByUrl(redirect);
      }, this.redirectDelay);
    }
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = true;
        const redirect = '/pages/dashboard';

        if (result.isSuccess()) {
          this.messages = result.getMessages();

          localStorage.setItem('AuthToken', result?.getToken().getValue());
          if (redirect) {
            return this.router.navigateByUrl(redirect);
          }
        } else {
          this.errors = result.getErrors();
          // redirect = null;
        }

        // const redirect = '/auth/login';
        // const redirect =
        //   sessionStorage.getItem('redirectUrl') || result.getRedirect();
        // sessionStorage.removeItem('redirectUrl');

        // this.cd.detectChanges();
      });
  }
}
