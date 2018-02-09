import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { VisionAPIService } from './services/vision/vision.service';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebcamModule
  ],
  providers: [
    VisionAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
