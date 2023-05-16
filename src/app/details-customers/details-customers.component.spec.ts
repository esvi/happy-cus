import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCustomersComponent } from './details-customers.component';

describe('DetailsCustomersComponent', () => {
  let component: DetailsCustomersComponent;
  let fixture: ComponentFixture<DetailsCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCustomersComponent]
    });
    fixture = TestBed.createComponent(DetailsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
