import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { EncaisseService } from 'src/app/services/encaisse.service';
import { Client } from 'src/app/shared/client';
import { Encaissement } from 'src/app/shared/encaissement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-encaissement',
  templateUrl: './detail-encaissement.component.html',
  styleUrls: ['./detail-encaissement.component.css']
})
export class DetailEncaissementComponent implements OnInit {
  id : any;
  currentPage = 0;
  encaisse : any[]=[];
  selectedEncaisse?: Encaissement;
  total: any;
  totalpaye: any;
  encaissementsUniques?: string[];
  client?: Client;
  constructor(private encaisseService : EncaisseService,
    private route : ActivatedRoute,
    private clientService : ClientService
  ) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getEncaisse()
    this.getTotalTtc()
    this.getTotalPaye()
    this.getClientById()
  }
  getClientById(){
    this.clientService.getByClient(this.id).subscribe(clt=>{
      this.client = clt
    })
  }
  goToPage(searchForm : string){
    console.log(searchForm);
    this.currentPage = 0;
    this.encaisse = [];
    this.getEncaisse(searchForm);
  }
  isSelected(encaisse : Encaissement) : boolean{
    return this.selectedEncaisse ? this.selectedEncaisse.id === encaisse.id : false ;
  }
  selectClient(encaisse : Encaissement){
    this.selectedEncaisse = encaisse
  }
  pagePrevious(): void {
    if(this.currentPage > 0){
      this.currentPage = this.currentPage - 1;
      this.getEncaisse();
    }
    
    
  }
  pageNext(): void {
    if(this.encaisse.length > 9){
      this.currentPage = this.currentPage + 1;
      this.getEncaisse();
    }
    
  }
  getEncaisse(searchKey : string = ""){
    this.encaisseService.getEncaissePage(this.currentPage , searchKey , this.id).subscribe(encaisse =>{
      this.encaisse = encaisse.content;
      console.log(this.encaisse)
    })
  }
  getTotalTtc(){
    this.encaisseService.getTotal(this.id).subscribe(enc =>{
      this.total =Math. round(enc * 100) / 100 ,
      console.log(enc)
    })
  }
  getTotalPaye(){
    this.encaisseService.getTotalPaye(this.id).subscribe(encpay =>{
      this.totalpaye = encpay,
      console.log(encpay)
    })
  }
  goToDelete(id : number){
    Swal.fire({
      title: 'Êtes-vous sûre?',
      text: "Vous ne pourrez pas inverser cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.encaisseService.delete(id).subscribe(enc =>{
          console.log(enc),
          this.getEncaisse();
          this.getTotalTtc()
          this.getTotalPaye()              
        })
        
        Swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.',
          'success',
        )
      }
      
    })  
  }

}
