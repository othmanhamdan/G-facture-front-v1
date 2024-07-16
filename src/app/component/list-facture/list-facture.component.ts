import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleComponent } from '../article/article.component';
import { DetailFactureComponent } from '../detail-facture/detail-facture.component';
import { Facture } from 'src/app/shared/facture';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  
  facture : any[]=[];
  currentPage = 0;
  selectedFacture? : Facture

  constructor(private factureService : FactureService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.loadItems();
  }
  selectFacture(facture : Facture){
    this.selectedFacture = facture
  }
  isSelected(facture : Facture) : boolean{
    return this.selectedFacture ? this.selectedFacture.id === facture.id : false ;
  }
  goToPage(searchForm : string){
    console.log(searchForm);
    this.currentPage = 0;
    this.facture = [];
    this.loadItems(searchForm);
    
  }
  pageNext(): void {
    
    if( this.facture.length > 9){
      this.currentPage = this.currentPage + 1;
      this.loadItems();
    }
    
  }
  pagePrevious(): void {
    if(this.currentPage > 0){
      this.currentPage = this.currentPage - 1;
      this.loadItems();
    }
    
    
  }
  loadItems(searchKey : string = "") {
    this.factureService.getItems(this.currentPage , searchKey)
      .subscribe(data => {
        this.facture = data.content;
        console.log(this.facture)
        
      });
  }
  openArticle(facture: any){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "50%";
      dialogConfig.height= "70%";
      dialogConfig.data = {
        id : facture.id,
        numFacture : facture.numFacture

      }
    this.dialog.open(ArticleComponent,dialogConfig)
  }
  openDetail(facture : any){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.width = "60%";
      dialogConfig.height= "70%";
      dialogConfig.data = {
        id : facture.id,
        numFacture : facture.numFacture,
        valider : facture.valider
      }
    this.dialog.open(DetailFactureComponent,dialogConfig)
  }
  telecharger(facture : any): void {
    this.factureService.telechargerPDF(facture.id).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  valider(facture : Facture){
    Swal.fire({
      title: 'Êtes-vous sûre?',
      text: "Vous ne pourrez pas inverser cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, validez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.factureService.valide(facture).subscribe( fac =>{
        console.log(fac),
        this.loadItems();
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la validation:', error);
    })
        Swal.fire(
          'validé!',
          'Votre fichier a été validé.',
          'success',
        )
      }
      
    })  
  }
  annuler(facture: Facture){
    Swal.fire({
      title: 'Êtes-vous sûre?',
      text: "Vous ne pourrez pas inverser cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, validez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.factureService.annuler(facture).subscribe( fac =>{
        console.log(fac),
        this.loadItems();
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la validation:', error);
    })
        Swal.fire(
          'Annulé!',
          'Votre fichier a été annulé.',
          'success',
        )
      }
      
    }) 
  }
  goToDelete(id : any){
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
        this.factureService.delete(id).subscribe(facture =>{
          console.log(facture),
          this.loadItems();              
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
