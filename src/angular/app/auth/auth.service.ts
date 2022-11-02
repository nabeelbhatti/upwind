import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAuthenticated(){
    this.isLoggedIn = !!JSON.parse(localStorage.getItem('auth_app_token'))?.value
    return this.isLoggedIn;
  }
}
