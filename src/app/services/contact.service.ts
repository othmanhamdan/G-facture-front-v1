import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }
  
  getContact(keyword : string) :Observable<any>{
    const url = `${this.apiUrl}/contact?keyword=${keyword}`;
    return this.http.get(url);
  }
}
