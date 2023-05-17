import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateToYears'})
export class DateToYearsPipe implements PipeTransform {
  transform(value: string): number {
    let today = moment();
    let valueAsDate = moment(value, 'YYYY-MM-DD');

    return today.diff(valueAsDate, 'years');
  }
}