import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private CUSTOMER_API = '/customer';
  private PREDICTION_API = '/model/predict';

  constructor(private httpClient: HttpClient) { }

  // Get customer list
  public getCustomers() {
    /**
     [
        {
          "customerId": "string",
          "name": "string",
          "birthDate": "string"
        }
      ]
     */
    return this.httpClient.get(`${this.CUSTOMER_API}/`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get customer orders
  public getCustomerOrders(id: string) {
    /**
     [
      {
        "orderLineId": "string",
        "date": "2023-05-16T17:17:23.435Z",
        "articleId": "string",
        "price": 0,
        "customerId": "string",
        "orderId": "string"
      }
    ]
    */
    return this.httpClient.get(`${this.CUSTOMER_API}/${id}/order-lines`)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get customer predictions
  public getCustomerPrediction(age: number, lastOrderDate: string) {
    /**
     {
      "age": 12,
      "lastOrderDate": "2023-05-16T00:00:00Z",
      "predictedNextOrderDate": "2026-08-30T12:00:00Z"
    }
    */
    return this.httpClient.get(`${this.PREDICTION_API}?age=${age}&lastOrderDate=${lastOrderDate}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = 'Something went wrong. Please try again later.';

    if (error.status === 0) {
      // Handle client-side or network errors
      console.error(`An error occurred:`, error.error.message);
    } else if (error.status === 400) {
      console.error(`Backend returned code ${error.status} with error: `, error.error.message);

      // Update error message
      errorMessage = error.error.message;
    } else {
      // Handle backend errors
      console.error(`Backend returned code ${error.status} with error: `, error.error.message);
    }

    // Return user friendly error
    return throwError(() => new Error(errorMessage));    
  }
}
