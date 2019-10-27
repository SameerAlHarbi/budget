import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    BeneficiariesSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
