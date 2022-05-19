import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarouselfeedComponent } from '../app/carousel/carouselfeed/carouselfeed.component';

const routes: Routes = [
  {path:'carousel',
   component:CarouselfeedComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
