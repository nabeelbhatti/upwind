import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ObjectId } from 'mongodb';
import { map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private https: HttpClient) {}
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem("auth_app_token"))?.value}`,
    );

  getAllClients() {
    return this.https
      .get<any>(`${environment.apiURL}/clients`, { headers: this.headers })
      .pipe(map((response: any) => response));
  }

  getDocsByClient(clientId){
    return this.https
      .post<any>(`${environment.apiURL}/clientDocType/getDocsByClient/${clientId.clientId}`, clientId, { headers: this.headers })
      .pipe(map((response: any) => response));
  }

  createClientDocs(payload){
    return this.https
    .post<any>(`${environment.apiURL}/clientDocType/createClientDocType`, payload, { headers: this.headers })
    .pipe(map((response: any) => response));
  }

  updateClientDocs(payload){
    return this.https
    .post<any>(`${environment.apiURL}/clientDocType/updateClientDocType/${payload._id}`, payload, { headers: this.headers })
    .pipe(map((response: any) => response));
  }
}
