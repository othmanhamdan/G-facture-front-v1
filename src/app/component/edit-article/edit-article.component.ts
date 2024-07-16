import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/shared/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  id : any;
  art : Article = {
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

  constructor(private route : ActivatedRoute,
              private articleService : ArticleService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.articleService.findById(this.id).subscribe(article =>{
      this.art = article;
      console.log(this.art)
    }, err =>{
      console.log(err)
    }
    )
  }
  onSubmit(){
    this.articleService.update(this.art).subscribe(article =>{
      console.log(article),
      this.router.navigate(['/listArticle'])
    })
  }
  changeFamilleProduit(e : any){
    console.log(e.target.value)
  }
  changeClasseProduit(e : any){
    console.log(e.target.value)
  }

}
