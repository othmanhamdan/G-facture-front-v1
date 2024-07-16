import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleFactureService } from 'src/app/services/article-facture.service';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/shared/article';
import { Facture } from 'src/app/shared/facture';
import { SousArticle } from 'src/app/shared/sousArticle';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  sousArticle : SousArticle = {
    id : 0,
    prixUnitaire : undefined,
    quantite : undefined,
    tva : 20,
    facture : undefined,
    article : undefined,
  }
  article : Article = {
    id : 0

  }
  factur : Facture = {
    id : 0,
    numFacture : ""
  }
  articl : Article[] =[]

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : MatDialogRef<ArticleComponent>,
              private articleService : ArticleService,
              private articleFactureService : ArticleFactureService) { }

  ngOnInit(): void {
    this.factur = this.data;
    this.sousArticle.facture = this.factur;
    //this.getAll();
  }
  changeArticle(e:any){
    console.log(e.target.value)
    this.article.id = e.target.value
    this.sousArticle.article = this.article;
    console.log(this.article)
  }
  onSubmit(){
    this.articleFactureService.save(this.sousArticle).subscribe(
      sousArticleFacture => console.log(sousArticleFacture)
    )
  }
  closed(){
    this.dialogRef.close();
  }
  /*getAll(){
    this.articleService.getArticle().subscribe(
      article => {
        this.articl = article,
        console.log(this.articl)
      })
  }*/

}
