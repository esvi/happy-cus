import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listing-customers',
  templateUrl: './listing-customers.component.html',
  styleUrls: ['./listing-customers.component.scss']
})
export class ListingCustomersComponent implements AfterViewInit {
  // Table
  displayedColumns: string[] = ['details', 'name', 'age', 'id'];

  // Customers
  customers: any = [];
  customersFiltered: any = [];

  // Paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private customersService: CustomersService, 
    private router: Router
    ) { }

  ngAfterViewInit() {
    this.customersService.getCustomers().subscribe((data: any) => {
      // Data
      this.customers = data;

      // Filter/paginator
      this.customersFiltered = new MatTableDataSource(data);

      // Filter by name only
      this.customersFiltered.filterPredicate = function(data: any, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };

      // Setup pagination
      this.customersFiltered.paginator = this.paginator;
    });
  }
  
  applyFilter(event: Event) {
    // Apply filter from input
    const filter = (event.target as HTMLInputElement).value;

    this.customersFiltered.filter = filter.trim().toLowerCase();

    // Reset to first page on filtering
    if (this.customersFiltered.paginator) {
      this.customersFiltered.paginator.firstPage();
    }
  }

  viewDetails(customer: any) {
    this.router.navigate(['details'], { state: customer });
  }
}
