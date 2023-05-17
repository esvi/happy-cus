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
  hintAge: string = 'Please enter an age between 12 and 120.';
  invalidAge: string = 'The age must be between 12 and 120.';

  formHasErrors: boolean = false;
  formUntouched: boolean = true;

  // Predictions
  showPrediction: boolean = false;
  doneLoadingPrediction: boolean = false;

  prediction: string;

  // Form controls
  today = new Date();
  ageFormControl = new FormControl('', [Validators.min(13), Validators.max(119)]);
  dateFormControl = new FormControl(moment().format('YYYY-MM-DD'));

  constructor(private customersService: CustomersService) { }

  getPrediction() {
    // Get form values
    const age = Number(this.ageFormControl.value);
    const hasDate = this.dateFormControl.value;
    const date = hasDate ? moment(this.dateFormControl.value).format('YYYY-MM-DD') : '';

    // TODO: Proper validation
    if (age && date) {

      // Start spinner
      this.doneLoadingPrediction = false;
      this.showPrediction = true;

      // Get next order predictions
      this.customersService.getCustomerPrediction(age, date).subscribe({
        next: (data: any) => {
          console.info('Predictions loading...');

          // Data
          this.prediction = data.predictedNextOrderDate;
        },
        error: (error: any) => {
          // Show error
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
}
