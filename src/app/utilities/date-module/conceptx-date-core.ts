import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);
export const conceptXDate = dayjs;

