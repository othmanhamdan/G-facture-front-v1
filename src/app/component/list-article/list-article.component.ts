import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/shared/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  currentPage = 0;
  article : any[]=[]
  selectedArticle?: Article;
  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
    this.loadItems();
  }
  goToPage(searchForm : string){
    console.log(searchForm);
    this.currentPage = 0;
    this.article = [];
    this.loadItems(searchForm);
    
  }
  pageNext(): void {
    
    if( this.article.length > 9){
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
    this.articleService.getItems(this.currentPage , searchKey)
      .subscribe(data => {
        this.article = data.content;
        console.log(this.article)
        
      });
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
        this.articleService.delete(id).subscribe(article =>{
          console.log(article),
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
  selectArticle(article : Article){
    this.selectedArticle = article
  }
  isSelected(article : Article) : boolean{
    return this.selectedArticle ? this.selectedArticle.id === article.id : false ;
  }

}
