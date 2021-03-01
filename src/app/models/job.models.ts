import { PartInterface, PartRevisionInterface } from './part.models';
import { RfqInterface } from './rfq.models';
import { PaymentInterface, QuoteInterface } from './quote.models';
import { JobStatus } from '../utilities/constants';

type JobStatusKeys = keyof typeof JobStatus;
export type JobStatusType = typeof JobStatus[JobStatusKeys];

export interface JobInterface {
  id: string;
  part: PartInterface;
  revision: PartRevisionInterface;
  requestQuote: RfqInterface;
  quote: QuoteInterface;
  payment: PaymentInterface;
  shop: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    companyLegalName: string,
    businessPhoneNumber: string;
  };
  displayId: string;
  status: JobStatusType;
  creationDate: string;
}
