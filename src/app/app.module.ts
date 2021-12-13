import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { UserComponent } from './modules/User/user/user.component';
import { ProduitComponent } from './modules/Produit/produit/produit.component';
import { StockComponent } from './modules/Stock/stock/stock.component';
import { FactureComponent } from './modules/Facture/facture/facture.component';
import { FournisseurComponent } from './modules/Fournisseur/fournisseur/fournisseur.component';
import { UserAuthComponent } from './modules/Auth/user-auth/user-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditFactureComponent } from './modules/edit-facture/edit-facture.component';
import { AddFactureComponent } from './modules/addfacture/add-facture/add-facture.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProduitComponent,
    StockComponent,
    FactureComponent,
    FournisseurComponent,
    UserAuthComponent,
    EditFactureComponent,
    AddFactureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
