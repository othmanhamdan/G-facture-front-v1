import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/shared/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  client : any[]=[];
  selectedClient?: Client;
  constructor(private clientService : ClientService) { }
  currentPage = 0;
  ngOnInit(): void {
    this.getClient();
  }
  pageNext(): void {
    if(this.client.length > 9){
      this.currentPage = this.currentPage + 1;
      this.getClient();
    }
    
  }
  pagePrevious(): void {
    if(this.currentPage > 0){
      this.currentPage = this.currentPage - 1;
      this.getClient();
    }
    
    
  }
  selectClient(client : Client){
    this.selectedClient = client
  }
  isSelected(client : Client) : boolean{
    return this.selectedClient ? this.selectedClient.id === client.id : false ;
  }
  getClient(searchKey : string = ""){
    this.clientService.getClientPage(this.currentPage , searchKey).subscribe(client =>{
      this.client = client.content;
      console.log(this.client)
    })
  }
  goToPage(searchForm : string){
    console.log(searchForm);
    this.currentPage = 0;
    this.client = [];
    this.getClient(searchForm);
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
        this.clientService.delete(id).subscribe(facture =>{
          console.log(facture),
          this.getClient();              
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
