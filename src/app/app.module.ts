import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { VisionAPIService } from './services/vision/vision.service';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebcamModule,
    LoadingModule
  ],
  providers: [
    VisionAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
