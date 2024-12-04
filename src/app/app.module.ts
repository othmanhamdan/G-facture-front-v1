import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AddFactureComponent } from './component/add-facture/add-facture.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleComponent } from './component/article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListFactureComponent } from './component/list-facture/list-facture.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleTypeComponent } from './component/article-type/article-type.component';
import { DetailFactureComponent } from './component/detail-facture/detail-facture.component';
import { AddClientComponent } from './component/add-client/add-client-component';
import { ListClientComponent } from './component/list-client/list-client.component';
import { ListArticleComponent } from './component/list-article/list-article.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFactureComponent } from './component/edit-facture/edit-facture.component';
import { EditArticleComponent } from './component/edit-article/edit-article.component';
import { EditClientComponent } from './component/edit-client/edit-client.component';
import { EncaissementComponent } from './component/encaissement/encaissement.component';
import { DetailEncaissementComponent } from './component/detail-encaissement/detail-encaissement.component';
import { DetailPaiementComponent } from './component/detail-paiement/detail-paiement.component';
import { EditPaiementComponent } from './component/edit-paiement/edit-paiement.component';
import { AddPaiementComponent } from './component/add-paiement/add-paiement.component';
import { VideComponent } from './component/vide/vide.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AddFactureComponent,
    ListFactureComponent,
    ArticleComponent,
    ArticleTypeComponent,
    DetailFactureComponent,
    AddClientComponent,
    ListClientComponent,
    ListArticleComponent,
    EditFactureComponent,
    EditArticleComponent,
    EditClientComponent,
    EncaissementComponent,
    DetailEncaissementComponent,
    DetailPaiementComponent,
    EditPaiementComponent,
    AddPaiementComponent,
    VideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
