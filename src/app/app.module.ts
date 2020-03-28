import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthComponent } from './auth/auth.component';
import { AuthIterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
    SharedModule
  ],
  providers: [ShoppingListService,
    {
      provide:HTTP_INTERCEPTORS,useClass:AuthIterceptorService,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
