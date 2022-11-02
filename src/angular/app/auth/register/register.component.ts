import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends NbRegisterComponent {
  user: any = {
    name: 'Talha Zubair',
    email: 'pms@jibe.solutions',
    password: 'pms1234',
  };

  register(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.register(this.strategy, this.user).subscribe(result => {
      this.submitted = true;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        localStorage.setItem('AuthToken', result?.getToken().getValue());
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
