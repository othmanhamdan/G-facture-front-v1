import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SousArticle } from '../shared/sousArticle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleFactureService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  save(sousArticle : SousArticle):Observable<any>{
    const url = `${this.apiUrl}/articleFacture`;
    return this.http.post(url, sousArticle);
  }
  getByIdFacture = (id : number) : Observable<any> =>{
    const url = `${this.apiUrl}/articleFacture/getByFacture?id=${id}`;
    return this.http.get<any>(url)
  }
  delete(id : number){
    const url = `${this.apiUrl}/articleFacture/${id}`;
    return this.http.delete<any>(url);
  }
}
