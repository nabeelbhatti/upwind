import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject } from 'rxjs';
import { environment } from './../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PmsProjectsService {
  Subject = new ReplaySubject(1);
  constructor(private https: HttpClient) { }
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem('auth_app_token'))?.value}`,
    );

  updatePmsProject(Payload) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms_project/UpdatePmsFieldsFromVessel/${Payload.id}`,
        Payload,
        {
          headers: this.headers,
        },
      )
      .pipe(map((response: any) => response));
  }

  updatePmsProjectWithPut(Payload) {
    return this.https
      .put<any>(`${environment.apiURL}/pms_project/${Payload.id}`, Payload, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getAllpmsProject() {
    return this.https
      .get<any>(`${environment.apiURL}/pms_project`, { headers: this.headers })
      .pipe(map((response: any) => response));
  }

  addPmsProject(vessel) {
    return this.https
      .post<any>(`${environment.apiURL}/pms_project`, vessel, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }
  deletePmsProject(id) {
    return this.https
      .delete<any>(`${environment.apiURL}/pms_project/${id}`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }
  editPmsProject(data: any) {
    return this.https
      .patch<any>(`${environment.apiURL}/pms_project/${data.id}`, data.data, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  GetParticualrVesselInformationFromPmsProject(Payload: any) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms_project/GetParticualrVesselInformationFromPmsProject`,
        Payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  // getPmsProjectDetail(id: any) {
  //   return this.https
  //     .get<any>(`${environment.apiURL}/pms_automation_spare?vessel_id=${id}`, {
  //       headers: this.headers,
  //     })
  //     .pipe(map((response: any) => response));
  // }

  getPmsProjectDetail(id: any) {
    return this.https
      .get<any>(`${environment.apiURL}/ocr_result?projectId=${id}`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  downLoadVessel(id: any, filename) {
    return this.https.get<any>(
      // `${environment.apiURL}/pms_project/download/${id}/DBM.csv`,
      `${environment.apiURL}/pms_project/download/${id}/${filename}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json',
        headers: this.headers,
      },
    );
  }

  refreshProject(id: any) {
    return this.https.get<any>(
      `${environment.apiURL}/pms_project/refresh/${id}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json',
        headers: this.headers,
      },
    );
  }

  getPMSprojectStatuses() {
    return this.https
      .get<any>(`${environment.apiURL}/status`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getProjectStages() {
    return this.https
      .get<any>(`${environment.apiURL}/stage`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getProjectFiles(id: any): Observable<Blob> {
    const token = `Bearer ${
      JSON.parse(localStorage.getItem('auth_app_token'))?.value
    }`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
      responseType: 'blob',
    });

    return this.https.get<any>(
      `${environment.apiURL}/ocr_result/files?path=${id}`,
      {
        headers: headers,
        responseType: 'arraybuffer' as 'json',
      },
    );
  }

  getJobs(components, makers, model, offset, client_name = null) {
    let found = false;
    let url = `${environment.apiURL}/machiney_job`;

    if (components && components.length) {
      found = true;
      url += '?component=' + components;
    }
    if (makers && makers.length) {
      url += !found ? '?makers=' + makers : '&makers=' + makers;
    }
    if (model && model.length) {
      url += !found ? '?model=' + model : '&model=' + model;
      found = true;
    }
    if (client_name) {
      url += !found
        ? '?client_name=' + client_name
        : '&client_name=' + client_name;
      found = true;
    }
    url += !found ? '?offset=' + offset : '&offset=' + offset;
    return this.https.get<any>(
      // `${environment.apiURL}/machiney_job?maker=${makers}&model=${model}&offset=${offset}`,
      url,
      {
        headers: this.headers,
      },
    );
  }

  getSparess(components, makers, model, offset) {
    return this.https.get<any>(
      `${environment.apiURL}/machinery_spears?component=${components}&maker=${makers}&model=${model}&offset=${offset}`,
      // `${environment.apiURL}/machinery_spears?maker=${makers}&offset=${offset}`,
      {
        headers: this.headers,
      },
    );
  }
  getClientName(client_name) {
    return this.https.get<any>(
      `${environment.apiURL}/pms_project?client_name=${client_name}`,
      {
        headers: this.headers,
      },
    );
  }
  linkjobs(ocrId, jobIds) {
    return this.https.post<any>(
      `${environment.apiURL}/ocr_result/${ocrId}`,
      jobIds,
      {
        headers: this.headers,
      },
    );
  }

  linkSpares(ocrId, spareIds) {
    return this.https.post<any>(
      `${environment.apiURL}/ocr_result/spares/${ocrId}`,
      spareIds,
      {
        headers: this.headers,
      },
    );
  }

  createNewJob(ocrId, data) {
    return this.https.post<any>(`${environment.apiURL}/machiney_job`, data, {
      headers: this.headers,
    });
  }
  createNewSpare(data) {
    return this.https.post<any>(
      `${environment.apiURL}/machinery_spears`,
      data,
      {
        headers: this.headers,
      },
    );
  }

  deleteJob(id, data) {
    return this.https.post<any>(
      `${environment.apiURL}/ocr_result/jobs/delete/${id}`,
      {
        deleted_jobs: data,
      },
      {
        headers: this.headers,
      },
    );
  }
  deleteSpare(id, data) {
    return this.https.post<any>(
      `${environment.apiURL}/ocr_result/spares/delete/${id}`,
      {
        deleted_jobs: data,
      },
      {
        headers: this.headers,
      },
    );
  }

  addParentFileForProject(payload: any) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms-parent-files/createParentFileForProject`,
        payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  updateParentFileById(id: string, payload: any) {
    return this.https
      .post<any>(
        `${environment.apiURL}/pms-parent-files/updateParentFileById/${id}`,
        payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }

  getParentFilesByProjectId(projectId: string, fileType: string = 'Source Manual') {
    return this.https.get<any>(
      `${environment.apiURL}/pms-parent-files/getParentFilesByProjectId/${projectId}/${fileType}`,
      {
        headers: this.headers,
      },
    );
  }

  // getParentFileById(id: String) {
  //   return this.https.get<any>(
  //     `${environment.apiURL}/pms-parent-files/getParentFileById/${id}`,
  //     {
  //       headers: this.headers,
  //     },
  //   );
  // }

  SendMessageWithData(MessageAndData:any){
    this.Subject.next(MessageAndData);
    localStorage.setItem('pid',JSON.stringify(MessageAndData));
  }
  GetMessageWithData(){
      return this.Subject.asObservable();
  }

  // addParentFileForProject(Payload:any){
  //   return this.https.post<any>(
  //     `${environment.apiURL}/pms-parent-files/createParentFileForProject`,
  //     Payload,
  //     {
  //       headers: this.headers,
  //     },
  //   );
  // }

  // getParentFilesByProjectId(Id,Type){
  //   return this.https.get<any>(
  //     `${environment.apiURL}/pms-parent-files/getParentFilesByProjectId/${Id}/${Type}`,
  //     {
  //       headers: this.headers,
  //     },
  //   )
  // }

  // updateParentFileById(Id,PayLoad){
  //   return this.https.post<any>(
  //     `${environment.apiURL}/pms-parent-files/updateParentFileById/${Id}`, PayLoad ,
  //     {
  //       headers: this.headers,
  //     },
  //   )
  // }

  deleteParentFileByID(Id){
    return this.https.delete<any>(
      `${environment.apiURL}/pms-parent-files/deleteParentFileByID/${Id}`,
      {
        headers: this.headers,
      },
    )
  }

  getAllChildsByParentIdArray(PayLoad:any){
    return this.https.post<any>(
      `${environment.apiURL}/pms-child-files/getAllChildsByParentIdArray`, PayLoad,
      {
        headers: this.headers,
      },
    )
  }

  deleteChildFileByID(Id){
    return this.https.delete<any>(
      `${environment.apiURL}/pms-child-files/deleteChildFileByID/${Id}`,
      {
        headers: this.headers,
      },
    )
  }

  getLocalStorageValue(){
    let data = JSON.parse(localStorage.getItem('pid'));
    return data;
  }

  getFilesByParentFileId(Id){
    return this.https.get<any>(
      `${environment.apiURL}/pms-child-files/getFilesByParentFileId/${Id}`,
      {
        headers: this.headers,
      },
    )
  }

  createChildFileForProject(PayLoad){
    return this.https.post<any>(
      `${environment.apiURL}/pms-child-files/createChildFileForProject`,PayLoad,
      {
        headers: this.headers,
      },
    )
  }

  updateChildFileById(Id,PayLoad){
    return this.https.put<any>(
      `${environment.apiURL}/pms-child-files/updateChildFileById/${Id}`,PayLoad,
      {
        headers: this.headers,
      },
    )
  }

  getParentFileById(Id){
    return this.https.get<any>(
      `${environment.apiURL}/pms-parent-files/getParentFileById/${Id}`,
      {
        headers: this.headers,
      },
    )
  }
  getManualSources() {
    return this.https.get<any>(`${environment.apiURL}/project_file`, {
      headers: this.headers,
    });
  }
  getChildFilesByProjectIds(list) {
    return this.https.post<any>(
      `${environment.apiURL}/pms-child-files/getAllChildsByParentIdArray`,
      { _id: list },
    );
  }
  createParentFileForProject(data) {
    return this.https.post<any>(
      `${environment.apiURL}/pms-parent-files/createParentFileForProject`,
      data,
    );
  }
  updateParentFileForProject(data, id) {
    return this.https.post<any>(
      `${environment.apiURL}/pms-parent-files/updateChildFileForManualSourceById/${id}`,
      data,
    );
  }
  extractParentFileForProject(id: any) {
    return this.https.patch<any>(
      `${environment.apiURL}/pms-parent-files/extractParentFileForProject/${id}`,
      {},
    );
  }

  startParentFileForProject(id: any) {
    return this.https.patch<any>(
      `${environment.apiURL}/pms-parent-files/startParentFileForProject/${id}`,
      {},
    );
  }
  getScreeningReportByprojectId(id: any) {
    return this.https.get<any>(
      `${environment.apiURL}/screening_report/project/${id}`
    );
  }
}
