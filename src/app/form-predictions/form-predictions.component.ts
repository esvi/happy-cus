import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { CustomersService } from '../customers.service';

import * as moment from 'moment';

@Component({
  selector: 'app-form-predictions',
  templateUrl: './form-predictions.component.html',
  styleUrls: ['./form-predictions.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class FormPredictionsComponent {
  // Errors
  ageErrorMessage: string;
  predictionErrorMessage: string;

  predictionLoading: boolean = true;
  doneLoadingPrediction: boolean = false;

  formHasErrors: boolean = false;
  formUntouched: boolean = true;

  // Predictions
  prediction: string;

  // Form controls
  ageFormControl = new FormControl('', [Validators.min(13), Validators.max(119)]);
  dateFormControl = new FormControl(moment().format('YYYY-MM-DD'));

  constructor(private customersService: CustomersService) { }

  getPrediction() {
    const age = Number(this.ageFormControl.value);
    const date = this.dateFormControl.value ? this.dateFormControl.value.toString() : '';

    // Get next order predictions
    this.customersService.getCustomerPrediction(age, date).subscribe({
      next: (data: any) => {
        console.info('Predictions loading...');

        // Data
        this.prediction = data.predictedNextOrderDate;
      },
      error: (error: any) => {
        // Throw error
        console.log('error', error);

        this.predictionErrorMessage = error;
      },
      complete: () => {
        console.info('Predictions loaded.');

        // Show predictions
        this.doneLoadingPrediction = true;
      }
    });
  }
}
