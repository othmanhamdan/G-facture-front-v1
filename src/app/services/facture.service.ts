import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from '../shared/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  save(facture : Facture): Observable<any>{
    const url = `${this.apiUrl}/facture`;
    console.log(facture.modLivraison)
    return this.http.post(url, facture);
  }
  getItems(page: number, searchForm : string = ""):Observable<any> {
    const url = `${this.apiUrl}/facture?page=${page}&searchNum=${searchForm}`;
    return this.http.get(url);
  }
  telechargerPDF(id : number): Observable<Blob> {
    const url = `${this.apiUrl}/report/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
  valide(facture : Facture){
    const url=`${this.apiUrl}/facture/valide`;
    return this.http.put(url, facture);

  }
  delete(id : number){
    const url = `${this.apiUrl}/facture/${id}`;
    return this.http.delete<any>(url);
  }
  getById(id : number){
    const url = `${this.apiUrl}/facture/byId?id=${id}`;
    return this.http.get(url);
  }
  annuler(facture : Facture){
    const url=`${this.apiUrl}/facture/annuler`;
    return this.http.put(url, facture);

  }
  update(facture : Facture): Observable<any>{
    const url=`${this.apiUrl}/facture/update`;
    return this.http.put(url, facture);
  }
  getAllFacture(keyword : string) :Observable<any>{
    const url = `${this.apiUrl}/facture/all?keyword=${keyword}`;
    return this.http.get(url);
  }

}
