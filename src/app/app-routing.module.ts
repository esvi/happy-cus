import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingCustomersComponent } from './listing-customers/listing-customers.component';
import { DetailsCustomersComponent } from './details-customers/details-customers.component';
import { FormPredictionsComponent } from './form-predictions/form-predictions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListingCustomersComponent },
  { path: 'details', component: DetailsCustomersComponent },
  { path: 'form', component: FormPredictionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
