import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPredictionsComponent } from './form-predictions.component';

describe('FormPredictionsComponent', () => {
  let component: FormPredictionsComponent;
  let fixture: ComponentFixture<FormPredictionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPredictionsComponent]
    });
    fixture = TestBed.createComponent(FormPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
