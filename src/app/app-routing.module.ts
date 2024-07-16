import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFactureComponent } from './component/add-facture/add-facture.component';
import { ListFactureComponent } from './component/list-facture/list-facture.component';
import { ArticleComponent } from './component/article/article.component';
import { ArticleTypeComponent } from './component/article-type/article-type.component';
import { AddClientComponent } from './component/add-client/add-client-component';
import { ListClientComponent } from './component/list-client/list-client.component';
import { ListArticleComponent } from './component/list-article/list-article.component';
import { EditFactureComponent } from './component/edit-facture/edit-facture.component';
import { EditArticleComponent } from './component/edit-article/edit-article.component';
import { EditClientComponent } from './component/edit-client/edit-client.component';

const routes: Routes = [
  {path : 'facture', component : AddFactureComponent},
  {path : 'list' , component : ListFactureComponent},
  {path : 'articleType' , component : ArticleTypeComponent},
  {path : 'addClient' , component : AddClientComponent},
  {path : 'listClient' , component : ListClientComponent},
  {path : 'listArticle' , component : ListArticleComponent},
  {path : 'edit-facture/:id' , component : EditFactureComponent},
  {path : 'edit-article/:id' , component : EditArticleComponent},
  {path : 'edit-client/:id' , component : EditClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
