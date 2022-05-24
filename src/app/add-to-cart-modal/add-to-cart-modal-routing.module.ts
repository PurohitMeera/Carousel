import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToCartModalComponent } from './add-to-cart-modal.component';

const routes: Routes = [
  { path: '', component: AddToCartModalComponent }  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToCartModalRoutingModule { }