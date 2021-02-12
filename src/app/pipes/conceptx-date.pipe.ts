import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'conceptXDatePipe'
})
export class ConceptxDatePipe extends DatePipe implements PipeTransform {
  DEFAULT_FORMAT = 'd.MM.yy | hh:mm aa';

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    return super.transform(value, format || this.DEFAULT_FORMAT, timezone, locale);
  }

}
