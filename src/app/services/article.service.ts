import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../shared/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }
  save(article : Article):Observable<any>{
    const url = `${this.apiUrl}/article`;
    return this.http.post(url, article);
  }
  getArticle(keyword : string) :Observable<any>{
    const url = `${this.apiUrl}/article?keyword=${keyword}`;
    return this.http.get(url);
  }
  getItems(page: number, keyword : string = ""):Observable<any> {
    const url = `${this.apiUrl}/article/page?page=${page}&keyword=${keyword}`;
    return this.http.get(url);
  }
  findById(id : number) : Observable<any>{
    const url = `${this.apiUrl}/article/byId?id=${id}`;
    return this.http.get(url);
  }
  delete(id : number){
    const url = `${this.apiUrl}/article/${id}`;
    return this.http.delete<any>(url);
  }
  update(article : Article): Observable<any>{
    const url=`${this.apiUrl}/article`;
    return this.http.put(url, article);
  }
  
}
