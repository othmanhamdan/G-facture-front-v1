import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getVille(keyword : string): Observable<any>{
    const url = `${this.apiUrl}/ville?keyword=${keyword}`;
    return this.http.get<any>(url);
  }
}
