import { Pipe, PipeTransform } from '@angular/core';
import { conceptXDate } from '../utilities/date-module/conceptx-date-core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  readonly DEFAULT_DURATIONS = ['years', 'months', 'weeks', 'days', 'hours', 'minutes'] as const;

  transform(secondsCount: number): string {
    const millisecondsCount = secondsCount * 1000;
    const duration = conceptXDate.duration(millisecondsCount);
    return this.DEFAULT_DURATIONS
      .map(durationKey => [duration.get(durationKey), durationKey])
      .filter(d => d[0] > 0)
      .map(d => d.join(' '))
      .join('-');
  }

}
