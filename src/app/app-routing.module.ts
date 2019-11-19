import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RelationsComponent } from './relations/relations.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiariesListComponent } from './beneficiaries/beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryEditComponent } from './beneficiaries/beneficiary-edit/beneficiary-edit.component';
import { AboutComponent } from './about/about.component';
import { BeneficiaryDetailsComponent } from './beneficiaries/beneficiary-details/beneficiary-details.component';
import { BeneficiaryResolver } from './beneficiaries/beneficiary-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'relations', component: RelationsComponent},
  {path: 'beneficiaries', component: BeneficiariesComponent, children: [
    {path: '', component: BeneficiariesListComponent},
    {path: 'new', component: BeneficiaryEditComponent},
    {path: ':code', component: BeneficiaryDetailsComponent, resolve: { beneficiaryResolved: BeneficiaryResolver}},
    {path: ':code/edit', component: BeneficiaryEditComponent}
  ]},
  {path: 'about', component: AboutComponent},
  {path: 'not-found', component: ErrorPageComponent
      , data : { errorType: 'notfound', message: 'Page not found'}}
  , {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
