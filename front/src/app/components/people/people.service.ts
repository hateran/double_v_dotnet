import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private _httpClient: HttpClient) { }

  listPeople() {
    let headers = new HttpHeaders();

    return this._httpClient.get(`${environment.apiUrl}/Person`, { headers: headers });
  }

  createPerson(form: any) {
    let headers = new HttpHeaders();

    return this._httpClient.post(`${environment.apiUrl}/Person`, form, { headers: headers });
  }

  editPerson(id: number, form: any) {
    let headers = new HttpHeaders();

    return this._httpClient.put(`${environment.apiUrl}/Person/${id}`, form, { headers: headers });
  }
}
