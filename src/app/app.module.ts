import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InformacionPersonalComponent } from './components/pago/informacion-personal/informacion-personal.component';
import { PagosComponent } from './components/pago/pagos/pagos.component';
import { Page404Component } from './components/page404/page404.component';
import { ResumenComponent } from './components/pago/resumen/resumen.component';
import { pagoReducer } from './reducers/pago.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InformacionPersonalComponent,
    PagosComponent,
    FooterComponent,
    ResumenComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      valorTotal: pagoReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
