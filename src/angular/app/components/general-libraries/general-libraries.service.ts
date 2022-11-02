import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { map, Observable } from "rxjs";

export interface LibraryDropdownData {
    name: string,
    value: string;
}

@Injectable({
    providedIn: 'root',
})
export class GeneralLibrariesService {
    private readonly headers: HttpHeaders;
    constructor(private readonly httpClient: HttpClient) {
        this.headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set(
                'Authorization',
                `Bearer ${JSON.parse(localStorage.getItem('auth_app_token')).value}`,
            );
    }

    public getLibrariesList(): Observable<LibraryDropdownData[]> {
        return this.httpClient.get<Record<string, string>>(`${environment.apiURL}/general-libraries/list`, {
            headers: this.headers,
        }).pipe(
            map(list => Object.keys(list).map((value) => ({ name: list[value], value })))
        );
    }

    public getLibraryData(libraryType: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${environment.apiURL}/general-libraries/${libraryType}`, {
            headers: this.headers,
        })
    }

    public createUpdateLibraryItem(libraryType: string, data: any): Observable<any> {
        return this.httpClient.post(`${environment.apiURL}/general-libraries/${libraryType}`, data, {
            headers: this.headers,
        });
    }

    public deleteLibraryItem(libraryType: string, id: string): Observable<any> {
        return this.httpClient.delete(`${environment.apiURL}/general-libraries/${libraryType}/${id}`, {
            headers: this.headers,
        })
    }
}