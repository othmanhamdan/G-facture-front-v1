import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaiementService } from 'src/app/services/paiement.service';
import { Paiement } from 'src/app/shared/paiement';
import { EditPaiementComponent } from '../edit-paiement/edit-paiement.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-paiement',
  templateUrl: './detail-paiement.component.html',
  styleUrls: ['./detail-paiement.component.css']
})
export class DetailPaiementComponent implements OnInit {
  currentPage = 0;
  id : any;
  paiement : any[]=[];
  selectedPaiement? : Paiement;
  constructor(private paiementService: PaiementService
    ,private dialog : MatDialog,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getPaiement()
  }
  goToPage(searchForm : string){
    console.log(searchForm);
    this.currentPage = 0;
    this.paiement = [];
    this.getPaiement(searchForm);
  }
  getPaiement(searchKey : string = ""){
    this.paiementService.getPaiementPage(this.currentPage ,this.id, searchKey).subscribe(paiement =>{
      this.paiement = paiement.content;
      console.log(this.paiement)
    })
  }
  isSelected(paiement : Paiement) : boolean{
    return this.selectedPaiement ? this.selectedPaiement.id === paiement.id : false ;
  }
  selectClient(paiement : Paiement){
    this.selectedPaiement = paiement
  }
  goToDelete(id : any){

  }
  pagePrevious(): void {
    if(this.currentPage > 0){
      this.currentPage = this.currentPage - 1;
      this.getPaiement();
    }
    
    
  }
  pageNext(): void {
    if(this.paiement.length > 9){
      this.currentPage = this.currentPage + 1;
      this.getPaiement();
    }
    
  }
  openDetail(paiement : any){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "30%";
      dialogConfig.height= "50%";
      dialogConfig.data = {
        id : paiement.id,
        num_facture : paiement.num_facture,
        mon_facture : paiement.mon_facture,
        encaissement: paiement.encaissement
      }
    this.dialog.open(EditPaiementComponent,dialogConfig)
  }

}
