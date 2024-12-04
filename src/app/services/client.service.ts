import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../shared/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getClient(keyword : string) :Observable<any>{
    const url = `${this.apiUrl}/client/all?keyword=${keyword}`;
    return this.http.get(url);
  }
  getClientPage(page: number, keyword : string = "") :Observable<any>{
    const url = `${this.apiUrl}/client?page=${page}&keyword=${keyword}`;
    return this.http.get(url);
  }
  save(client : Client): Observable<any>{
    const url = `${this.apiUrl}/client`;
    return this.http.post(url, client);
  }
  getByClient(id : number): Observable<any>{
    const url = `${this.apiUrl}/client/byId?id=${id}`;
    return this.http.get(url);
  }
  update(client : Client) : Observable<any>{
    const url = `${this.apiUrl}/client`;
    return this.http.put(url, client);
  }
  delete(id : number){
    const url = `${this.apiUrl}/client/${id}`;
    return this.http.delete<any>(url);
  }
  checkIfRaisonSocialExists(client : Client): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/client/exists?raisonSocial=${client.raisonSociale}`);
  }

}
