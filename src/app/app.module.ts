import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BanksComponent } from './banks/banks.component';
import { RelationsComponent } from './relations/relations.component';
import { RelationsListComponent } from './relations/relations-list/relations-list.component';
import { RelationEditComponent } from './relations/relation-edit/relation-edit.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiariesSummaryComponent } from './beneficiaries/beneficiaries-summary/beneficiaries-summary.component';
import { BeneficiariesListComponent } from './beneficiaries/beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryEditComponent } from './beneficiaries/beneficiary-edit/beneficiary-edit.component';
import { AboutComponent } from './about/about.component';
import { BeneficiaryDetailsComponent } from './beneficiaries/beneficiary-details/beneficiary-details.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { LoggingInterceptorService } from './shared/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BanksComponent,
    RelationsComponent,
    RelationsListComponent,
    RelationEditComponent,
    BeneficiariesComponent,
    BeneficiariesSummaryComponent,
    BeneficiariesListComponent,
    BeneficiaryEditComponent,
    AboutComponent,
    BeneficiaryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS
      , useClass: AuthInterceptorService
      , multi: true
    },
    {
        provide: HTTP_INTERCEPTORS
      , useClass: LoggingInterceptorService
      , multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
