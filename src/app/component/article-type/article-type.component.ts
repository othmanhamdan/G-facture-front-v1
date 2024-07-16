import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/shared/article';
import { Facture } from 'src/app/shared/facture';

@Component({
  selector: 'app-article-type',
  templateUrl: './article-type.component.html',
  styleUrls: ['./article-type.component.css']
})
export class ArticleTypeComponent implements OnInit {
  art : Article = {
    id : 0,
    codeArticle : "",
    libarticle : "",
    prixUnitaire : undefined ,
    tva : undefined ,
    unite : "",
    usineFabrication : "",
    articleVentable : "Oui",
    fabrique : "Achete",
    familleProduit : undefined,
    classeProduit : undefined,
    dateArticle : undefined
  }
  facture : Facture = {
    id : 0,
    numFacture : ""

  }

  constructor(private articleService : ArticleService,
              private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.articleService.save(this.art).subscribe(
      article => {
        console.log(article),
        this.router.navigate(['/listArticle'])
      } 
    )
  }
  changeFamilleProduit(e : any){
    console.log(e.target.value)
  }
  changeClasseProduit(e : any){
    console.log(e.target.value)
  }
  
}
