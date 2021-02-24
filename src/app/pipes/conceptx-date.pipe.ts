import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'conceptXDateTimePipe'
})
export class ConceptXDateTimePipePipe extends DatePipe implements PipeTransform {
  DEFAULT_DATETIME_FORMAT = 'MM.dd.yyyy | hh:mm aa';
  DEFAULT_DATE_FORMAT = 'MM.dd.yyyy';

  transform(value: any, format: 'date' | 'datetime' | string = 'datetime', timezone?: string, locale?: string): string | null {
    format = format === 'datetime' ? this.DEFAULT_DATETIME_FORMAT : format === 'date' ? this.DEFAULT_DATE_FORMAT : format;
    return super.transform(value, format, timezone, locale);
  }

}
