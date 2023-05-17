import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { DateToYearsPipe } from '../date-to-years.pipe';

import * as moment from 'moment';

@Component({
  selector: 'app-details-customers',
  templateUrl: './details-customers.component.html',
  styleUrls: ['./details-customers.component.scss']
})
export class DetailsCustomersComponent implements AfterViewInit {
  // Progress
  doneLoadingOrders: boolean = false;
  doneLoadingPrediction: boolean = false;

  // Customer
  customer: any = {};
  orders: any = [];

  predictionErrorMessage: string;

  constructor(
    private customersService: CustomersService, 
    private router: Router, 
    private dateToYearsPipe: DateToYearsPipe
    ) {
    this.customer = this.router.getCurrentNavigation()?.extras?.state || {}
  }

  ngAfterViewInit() {
    // Get last 10 orders
    this.customersService.getCustomerOrders(this.customer.customerId).subscribe((data: any) => {
      // Data
      this.orders = data;

      // Customer
      this.customer.orders = this.sortOrders(data);
      this.customer.age = this.convertDateToYears(this.customer.birthDate);

      // Show predictions
      this.doneLoadingOrders = true;

      // Fetch prediction only if there are orders to work with
      if (this.customer.orders.length) this.getPrediction(this.customer.age, this.customer.orders[0]);
    });
  }

  getPrediction(age: number, order: any) {
    // Format given date
    const lastOrderDate = moment(order.date).format('YYYY-MM-DD');

    // Get next order predictions
    this.customersService.getCustomerPrediction(age, lastOrderDate).subscribe({
      next: (data: any) => {
        console.info('Predictions loading...');

        // Data
        this.customer.prediction = data.predictedNextOrderDate;
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

  // Sort orders by date
  sortOrders(orders: any) {
    return orders.sort((a: any, b: any) => moment(b.date).valueOf() - moment(a.date).valueOf());
  }

  // Convert birthDate to age
  convertDateToYears(value: string) {
    return this.dateToYearsPipe.transform(value);
  }
}
