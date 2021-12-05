import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { ItemComponent } from './item/item.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
