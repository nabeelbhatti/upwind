import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PmsManualIndexService {
  constructor(private https: HttpClient) {}
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem('auth_app_token'))?.value}`,
    );

  getChildFilesByParentFileIds(parentFileIds = []) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms-child-files/getAllChildsByParentIdArray`,
        { _id: parentFileIds },
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  saveChildFileById(payload: any) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms-child-files/createChildFileForProject`,
        payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  updateChildFileById(id: string, payload: any) {
    return this.https
      .put<any>(
        `${environment.apiURL}/pms-child-files/updateChildFileById/${id}`,
        payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  compareChildFiles(projectId: string) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms-child-files/compareChildFiles/${projectId}`,
        {},
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }
}
