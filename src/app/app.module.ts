import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from './carousel/carousel.module';
import { LoggerService } from './logger.service';
import { TeV2AemService } from './te-v2-aem.service';
import { CommerceUtils } from './utils/commerceUtils';
import { ScreenService } from './utils/screen.service';
import { SettingsHelperService } from './utils/setting-helper.service';
import { TruncationService } from './utils/truncation.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [
    LoggerService,
    TeV2AemService,
    CommerceUtils,
    SettingsHelperService,
    { provide: 'Window',  useValue: window },
    ScreenService,
    TruncationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
