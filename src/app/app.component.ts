import { Component } from '@angular/core';
import { DateToYearsPipe } from './date-to-years.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DateToYearsPipe]
})
export class AppComponent {
  title = 'happy-cus-predictor';

  constructor(private dateToYearsPipe: DateToYearsPipe) {}
}
