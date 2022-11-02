import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private https: HttpClient) {}
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem('auth_app_token')).value}`,
    );

  getCategories(id) {
    return this.https
      .get<any>(`${environment.apiURL}/category?type=${id}`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getAllCategories() {
    return this.https
      .get<any>(`${environment.apiURL}/category/getAll`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getTypes() {
    return this.https
      .get<any>(`${environment.apiURL}/types`, { headers: this.headers })
      .pipe(map((response: any) => response));
  }

  addCategory(data) {
    return this.https.post<any>(`${environment.apiURL}/category`, data, {
      headers: this.headers,
    });
  }
  deleteCategory(id) {
    return this.https.delete<any>(`${environment.apiURL}/category/${id}`, {
      headers: this.headers,
    });
  }
  addCategorytype(data) {
    return this.https.post<any>(`${environment.apiURL}/types`, data, {
      headers: this.headers,
    });
  }
  deleteCategoryType(id) {
    return this.https.delete<any>(`${environment.apiURL}/types/${id}`, {
      headers: this.headers,
    });
  }

}
