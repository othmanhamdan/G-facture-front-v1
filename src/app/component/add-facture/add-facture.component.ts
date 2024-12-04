import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleFactureService } from 'src/app/services/article-facture.service';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { FactureService } from 'src/app/services/facture.service';
import { Article } from 'src/app/shared/article';
import { Client } from 'src/app/shared/client';
import { Facture } from 'src/app/shared/facture';
import { SousArticle } from 'src/app/shared/sousArticle';


@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {
  sousArticleFacture : SousArticle[] = [];
  afficher: boolean = false;
  afficherTva: boolean = false;
  
  afficherArticle: boolean = false;
  afficherClient: boolean = false;
  facture: Facture = {
    id: 0,
    numFacture: "",
    usineLivraison: "",
    numCamion: "",
    typeFacture: "facture",
    exonereTva: "Non",
    objetFacture: "",
    objetMarche: "",
    objetMois: "",
    dateFacture: undefined,
    client: undefined,
    modLivraison: ""
  };
  clt: Client[] = [];
  client: Client = {
    id: 0,
    numClient : ""
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
  factur: Facture = {
    id: 0,
    numFacture: ""
  };
  articl: Article[] = [];
  oneArticle: Article = {
    id: undefined,
    libarticle: "",
    prixUnitaire: undefined,
    tva: undefined,
  };
  constructor(private clientService: ClientService,
    private factureService: FactureService,
    private articleService: ArticleService,
    private articleFactureService: ArticleFactureService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.facture);
    this.factureService.save(this.facture).subscribe(
      fac => {
        console.log(fac),
        this.facture.id = fac.id,
        this.sousArticle.facture = this.facture;
        this.afficher = true;
      });
  }

  changeClient(e: any) {
    console.log(e)
    
    this.clientService.getClient(e).subscribe(cln => {
      this.afficherClient = false,
      this.clt = cln,      
      console.log(this.facture);
    }, error => {
      console.log(error);
    });
  }
  getAutoCompleteValueClient(option : any) {
      return option ? option.raisonSociale : "";
  }
  changeUsine(e: any) {
    console.log(e.target.value);
    this.facture.usineLivraison = e.target.value;
  }
  getAutoCompleteValueArticle(option : any){
    return option ? option.libarticle : "";
  }
  changeModeLivraison(e: any) {
    console.log(e.target.value);
    this.facture.modLivraison = e.target.value;
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
  get(id : any){
    console.log(id)
    this.findById(id);
    //this.sousArticle.prixUnitaire = this.oneArticle.prixUnitaire;
  }
  getClient(){
    this.afficherClient = true
  }
 
  findById(id: any) {
    this.articleService.findById(id).subscribe(oneArtice => {
      this.oneArticle = oneArtice;
      this.sousArticle.prixUnitaire = this.oneArticle.prixUnitaire;
      this.sousArticle.tva = this.oneArticle.tva;
    });
  }
  onSubmitArticle() {
    this.articleFactureService.save(this.sousArticle).subscribe(
      sousArticleFacture => {
        console.log(sousArticleFacture),
        this.getAllArticle();
        this.afficherArticle = true;
        this.viderArticle();
        //this.facture.exonereTva == "Non" ? this.afficherTva = true : this.afficherTva =false
      }
    );
    
  }
  viderArticle(){
    this.sousArticle.article =  undefined
    this.sousArticle.prixUnitaire =  undefined
    this.sousArticle.quantite = undefined
    this.sousArticle.tva = undefined
  }
  getAllArticle(){
    if (this.facture.id !== undefined)
    this.articleFactureService.getByIdFacture(this.facture.id).subscribe(sousArticle =>{
      this.sousArticleFacture = sousArticle;
      console.log(this.sousArticleFacture)
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
    for (const sousArticle of this.sousArticleFacture) {
      total += this.calculerHT(sousArticle) + this.calculerTVA(sousArticle)
    }
    return total;    
  }
  calculateTotalHT(): number {
    let total = 0;
    for (const sousArticle of this.sousArticleFacture) {
      total += this.calculerHT(sousArticle)
    }
    return total;    
  }
  

}
