import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paiement } from '../shared/paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }
  getPaiementPage(page: number,idEnc : number, keyword : string = "") :Observable<any>{
    const url = `${this.apiUrl}/paiement?page=${page}&idEnc=${idEnc}&keyword=${keyword}`;
    return this.http.get(url);
  }
  editPaiement(paiement : Paiement) :Observable<any>{
    const url = `${this.apiUrl}/paiement`;
    return this.http.post(url , paiement);
  }
  totalPaiement(id : number){
    const url = `${this.apiUrl}/paiement/totalPaiement?id=${id}`;
    return this.http.get(url);
  }
}
