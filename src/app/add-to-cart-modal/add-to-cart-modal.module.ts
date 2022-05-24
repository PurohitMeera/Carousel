import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartModalRoutingModule} from './add-to-cart-modal-routing.module';
import { AddToCartModalComponent } from './add-to-cart-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { TeV2AemService } from '../te-v2-aem.service';
import { ModalService } from '../utils/modal.service';
import { LoggerService } from '../logger.service';
import { ScreenService } from '../utils/screen.service';
@NgModule({
  
  imports: [
    CommonModule,
    AddToCartModalRoutingModule,
    HttpClientModule
  ],
  exports: [
    AddToCartModalComponent
  ],
  declarations: [AddToCartModalComponent],
  providers: [TeV2AemService, ModalService, LoggerService, ScreenService],
})
export class AddToCartModalModule { }