import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { UserAuthComponent } from './modules/Auth/user-auth/user-auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FactureComponent } from './modules/Facture/facture/facture.component';
import { FournisseurComponent } from './modules/Fournisseur/fournisseur/fournisseur.component';
import { ProduitComponent } from './modules/Produit/produit/produit.component';
import { RayonComponent } from './modules/rayon/rayon.component';
import { StockComponent } from './modules/Stock/stock/stock.component';
import { UserComponent } from './modules/User/user/user.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
 { path:'',component:DefaultComponent,children:[{path:'',component:UserAuthComponent},
 {path:'user',component:UserComponent},{path:'produit',component:ProduitComponent},
 {path:'stock',component:StockComponent},{path:'facture',component:FactureComponent},
 {path:'fournisseur',component:FournisseurComponent},{path:'login',component:UserAuthComponent},
 {path:'rayon',component:RayonComponent},
 
 {path: '**',component: NotFoundComponent }
            
  ]



}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
