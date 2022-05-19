import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselfeedComponent } from './carouselfeed/carouselfeed.component';
import { TnMerchandisingCarouselDataService } from '../services/tn-merchandising-carousel-data.service';
import { ProductDataUtilService } from '../product-data-util.service';


@NgModule({
  declarations: [
    CarouselfeedComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TnMerchandisingCarouselDataService,
    ProductDataUtilService
  ],
  exports: [CarouselfeedComponent]
})
export class CarouselModule { }
