import { Routes } from '@angular/router';

import {ProduitAjout} from './pages/produit-ajout/produit-ajout';
import {ProduitList} from './pages/produit-list/produit-list';
import {ProduitModifier} from './pages/produit-modifier/produit-modifier';
import {ProduitDetails} from './pages/produit-details/produit-details';
import {Error404} from './pages/error404/error404';

export const routes: Routes = [
  {path:'',component:ProduitAjout},
  {path:'produits/ajout',component:ProduitAjout},
  {path:'produits',component:ProduitList},
  {path:'produits/:id',component:ProduitModifier},

  {path:'produits/detail/:id',component:ProduitDetails},
  {path:'**',component:Error404},



];

