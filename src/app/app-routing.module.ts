import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RelationsComponent } from './relations/relations.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiariesListComponent } from './beneficiaries/beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryEditComponent } from './beneficiaries/beneficiary-edit/beneficiary-edit.component';
import { AboutComponent } from './about/about.component';
import { BeneficiaryDetailsComponent } from './beneficiaries/beneficiary-details/beneficiary-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'relations', component: RelationsComponent},
  {path: 'beneficiaries', component: BeneficiariesComponent, children: [
    {path: '', component: BeneficiariesListComponent},
    {path: 'new', component: BeneficiaryEditComponent},
    {path: ':code', component: BeneficiaryDetailsComponent},
    {path: ':code/edit', component: BeneficiaryEditComponent}
  ]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
