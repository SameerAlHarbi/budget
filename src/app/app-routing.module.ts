import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RelationsComponent } from './relations/relations.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiariesListComponent } from './beneficiaries/beneficiaries-list/beneficiaries-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'relations', component: RelationsComponent},
  {path: 'beneficiaries', component: BeneficiariesComponent, children:[
    {path: '', component: BeneficiariesListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
