import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encaissement } from '../shared/encaissement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncaisseService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  save(encaisse : Encaissement): Observable<any>{
    const url = `${this.apiUrl}/encaisse`;
    return this.http.post(url, encaisse);
  }
  getEncaissePage(page: number, keyword : string = "", id : number) :Observable<any>{
    const url = `${this.apiUrl}/encaisse?keyword=${keyword}&id=${id}&page=${page}`;
    return this.http.get(url);

  }
  getTotal(id : number): Observable<any>{
    const url = `${this.apiUrl}/encaisse/total?id=${id}`;
    return this.http.get(url);
  }
  getTotalPaye(id : number): Observable<any>{
    const url = `${this.apiUrl}/encaisse/paye?id=${id}`;
    return this.http.get(url);
  }
  delete(id : number){
    const url = `${this.apiUrl}/encaisse/${id}`;
    return this.http.delete<any>(url);
  }
}
