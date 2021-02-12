import { Pipe, PipeTransform } from '@angular/core';
import { conceptXDate } from '../utilities/date-module/conceptx-date-core';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: string | Date, withoutSuffix?: boolean): string | null {
    if (value instanceof String) {
      value = new Date(value);
    }
    return conceptXDate(value).fromNow(withoutSuffix);
  }

}
