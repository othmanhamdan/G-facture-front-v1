import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFactureService } from 'src/app/services/article-facture.service';
import { Facture } from 'src/app/shared/facture';
import { SousArticle } from 'src/app/shared/sousArticle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.css']
})
export class DetailFactureComponent implements OnInit {
  sousArticle : SousArticle[] = [];
  facture? : Facture

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private articleFactureService : ArticleFactureService) { }

  ngOnInit(): void {
    this.getArticleFacture();
    this.facture = this.data;
  }
  getArticleFacture(){
    this.articleFactureService.getByIdFacture(this.data.id).subscribe(sousArticle =>{
      this.sousArticle = sousArticle;
      console.log(this.sousArticle)
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la commande:', error);
    })
  }
  calculerHT(sousArticle: SousArticle): number {
    if (sousArticle.quantite !== undefined && sousArticle.prixUnitaire !== undefined) {
        const total = sousArticle.quantite * sousArticle.prixUnitaire;
        return total;
    } else {
        return 0;
    }
  }
  calculerTVA(sousArticle: SousArticle): number {
    if (sousArticle.quantite !== undefined && sousArticle.prixUnitaire !== undefined && sousArticle.tva !== undefined) {
        const total = (sousArticle.quantite * sousArticle.prixUnitaire * sousArticle.tva) / 100;
        return total;
    } else {
        return 0;
    }
  }
  calculateTotal(): number {
    let total = 0;
    for (const sousArticle of this.sousArticle) {
      total += this.calculerHT(sousArticle) + this.calculerTVA(sousArticle)
    }
    return total;    
  }
  calculateTotalHT(): number {
    let total = 0;
    for (const sousArticle of this.sousArticle) {
      total += this.calculerHT(sousArticle)
    }
    return total;    
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
        this.articleFactureService.delete(id).subscribe(articleFacture =>{
          console.log(articleFacture),
          this.getArticleFacture();
                      
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
