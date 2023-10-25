import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import {HttpClientModule } from '@angular/common/http';
import { ServiceRestService } from './services/service-rest.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule,
     IonicModule.forRoot(), AppRoutingModule,
     IonicStorageModule.forRoot(), HttpClientModule],
  providers: [{ provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy }, SQLite, ServiceRestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
