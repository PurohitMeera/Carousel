import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { 
    path: 'add-to-cart-modal', 
    loadChildren: () => import(`./add-to-cart-modal/add-to-cart-modal.module`).then(
      module => module.AddToCartModalModule
    )
  },
  {
    path: '',
    redirectTo: 'add-to-cart-modal',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }