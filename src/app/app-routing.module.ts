import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { UserAuthComponent } from './modules/Auth/user-auth/user-auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FactureComponent } from './modules/Facture/facture/facture.component';
import { FournisseurComponent } from './modules/Fournisseur/fournisseur/fournisseur.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ProduitComponent } from './modules/Produit/produit/produit.component';
import { StockComponent } from './modules/Stock/stock/stock.component';
import { UserComponent } from './modules/User/user/user.component';

const routes: Routes = [
 { 
   path:'',component:DefaultComponent,
   children:[{
     path:'',
     component:DashboardComponent
   },{
  path:'user',
  component:UserComponent
   },{
    path:'produit',
    component:ProduitComponent
     },{
      path:'stock',
      component:StockComponent
       },{
        path:'facture',
        component:FactureComponent
         },{
          path:'fournisseur',
          component:FournisseurComponent
           },{
            path:'login',
            component:UserAuthComponent
             }]



}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
