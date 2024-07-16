import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleFactureService } from 'src/app/services/article-facture.service';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { FactureService } from 'src/app/services/facture.service';
import { Article } from 'src/app/shared/article';
import { Client } from 'src/app/shared/client';
import { Facture } from 'src/app/shared/facture';
import { SousArticle } from 'src/app/shared/sousArticle';

@Component({
  selector: 'app-edit-facture',
  templateUrl: './edit-facture.component.html',
  styleUrls: ['./edit-facture.component.css']
})
export class EditFactureComponent implements OnInit {
  sousArticleFacture : SousArticle[] = [];
  id? : any;
  clt: Client[] = [];
  articl: Article[] = [];
  facture: Facture = {
    numFacture: "",
    usineLivraison: "",
    numCamion: "",
    typeFacture: "",
    exonereTva: "",
    objetFacture: "",
    objetMarche: "",
    objetMois: "",
    dateFacture: undefined,
    client: undefined,
    modLivraison: ""
  };
 
  sousArticle: SousArticle = {
    id: 0,
    prixUnitaire: undefined,
    quantite: undefined,
    tva: undefined,
    facture: undefined,
    article: undefined,
  };
  article: Article = {
    id: 0,
    prixUnitaire: undefined,
    libarticle: ""
  };
  oneArticle: Article = {
    id: undefined,
    libarticle: "",
    prixUnitaire: undefined,
    tva: undefined,
  };
  factur?: Facture;
  afArticle: boolean = false;
  afListeArticle: boolean = false;

  constructor(private route :ActivatedRoute, 
              private factureService : FactureService,
              private clientService : ClientService,
              private articleFactureService : ArticleFactureService,
              private articleService: ArticleService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.getById()
    this.id = this.route.snapshot.params.id;
    this.factureService.getById(this.id).subscribe(fac =>{
      this.facture = fac;
      this.getAllArticle();
      console.log(this.facture)
    }, err =>{
      console.log(err)
    }
    )
  }
  afficherArticle(){
    if(!this.afArticle){
      this.afArticle = true
    }else{
      this.afArticle = false
    }
    
  }
  afficherListeArticle(){
    if(!this.afListeArticle){
      this.afListeArticle = true
    }else{
      this.afListeArticle = false
    }
  }
  getAllArticle(){
    this.id = this.route.snapshot.params.id;
    if (this.id !== undefined)
    this.articleFactureService.getByIdFacture(this.id).subscribe(sousArticle =>{
      this.sousArticleFacture = sousArticle;
      console.log(this.sousArticleFacture)
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la commande:', error);
    })
  }
  get(id : any){
    console.log(id)
    this.findById(id);
    //this.sousArticle.prixUnitaire = this.oneArticle.prixUnitaire;
  }
  findById(id: any) {
    this.articleService.findById(id).subscribe(oneArtice => {
      this.oneArticle = oneArtice;
      this.sousArticle.prixUnitaire = this.oneArticle.prixUnitaire;
      this.sousArticle.tva = this.oneArticle.tva;
    });
  }
  changeArticle(e: any) {
    
    if(e){
      this.article.libarticle = e
    }else {
      this.article.libarticle = "";
    }
    this.articleService.getArticle(e).subscribe(
      article => {
        this.articl = article,
        console.log(this.articl)
      })
    //this.findById(this.article.id)
    //this.sousArticle.prixUnitaire = this.oneArticle.prixUnitaire;
  }
  getAutoCompleteValueArticle(option : any){
    return option ? option.libarticle : "";
  }
  onUpdate(){
    this.factureService.update(this.facture).subscribe(facture =>{
      console.log(facture),
      this.router.navigate(['/list'])
    })
  }
  viderArticle(){
    this.sousArticle.article = null || undefined
    this.sousArticle.prixUnitaire = null || undefined
    this.sousArticle.quantite = null || undefined
    this.sousArticle.tva = null || undefined
  }
  getById(){
    this.id = this.route.snapshot.params.id;
    this.factureService.getById(this.id).subscribe(faac =>{
      
      console.log(faac),
      this.sousArticle.facture = faac,
      console.log(this.sousArticle.facture)
    })
  }
  onSubmitArticle() { 
    
    this.articleFactureService.save(this.sousArticle).subscribe(
      sousArticleFacture => {
        console.log(sousArticleFacture),
        this.getAllArticle();
        this.viderArticle();
        //this.facture.exonereTva == "Non" ? this.afficherTva = true : this.afficherTva =false
      }
    );
    
  }
  changeUsine(e: any) {
    console.log(e.target.value);
    this.facture.usineLivraison = e.target.value;
  }
  changeModeLivraison(e: any) {
    console.log(e.target.value);
    this.facture.modLivraison = e.target.value;
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
    for (const sousArticle of this.sousArticleFacture) {
      total += this.calculerHT(sousArticle) + this.calculerTVA(sousArticle)
    }
    return total;    
  }
  changeClient(e: any) {
    console.log(e)
    
    this.clientService.getClient(e).subscribe(cln => {
      this.clt = cln,      
      console.log(this.facture);
    }, error => {
      console.log(error);
    });
  }
  getAutoCompleteValueClient(option : any) {
    return option ? option.raisonSociale : "";
}

}
