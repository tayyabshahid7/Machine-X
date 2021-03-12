import { AttachmentInterface, EngineerInterface } from './general.models';
import { PartInterface, PartRevisionInterface } from './part.models';
import { QuoteStatus } from '../utilities/constants';
import { RfqInterface } from './rfq.models';
import { JobInterface } from './job.models';

type QuoteStatusKeys = keyof typeof QuoteStatus;
export type QuoteStatusType = typeof QuoteStatus[QuoteStatusKeys];

export interface AddQuoteLineItemDataInterface {
  description: string;
  quantity: number;
  price: number;
}

export interface AddQuoteDataInterface {
  requestQuote: string;
  validForDays: string;
  deliveryDate: string;
  shopQuoteNumber: string;
  shopQuoteNotes: string;
  attachments: Array<File>;
  tax: string;
  shippingRate: string;
  lineItems: Array<AddQuoteLineItemDataInterface>;
}

export interface LineItemInterface {
  id: number;
  creationDate: string;
  description: string;
  quantity: number;
  price: number;
  returnedQuote: string;
}

export interface ShopInterface {
  id: string;
  companyLegalName: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state?: any;
  businessPhoneNumber: string;
}

export interface QuoteInterface {
  id: string;
  lineItems: LineItemInterface[];
  attachments: AttachmentInterface[];
  subtotal: number;
  grandTotal: number;
  shop: ShopInterface;
  part: PartInterface;
  revision: PartRevisionInterface;
  remainingSecondsToApply: number;
  remainingSecondsToDelivery: number;
  expiryDate: Date;
  displayId: string;
  shopQuoteNotes: string;
  shopQuoteNumber: string;
  deliveryDate: string;
  validForDays: number;
  status: QuoteStatusType;
  creationDate: string;
  shippingRate: number;
  platformFees: number;
  tax: number;
  requestQuote: string;
}


export interface PaymentInterface {
  id: string;
  requestQuote: string;
  job: string;
  jobDisplayId: string;
  part: string;
  revision: string;
  shop: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  creationDate: string;
  cardHolderName: string;
  email: string;
  amount: number;
  invoiceNumber: string;
  billingAddress: string;
}

export interface QuoteInvoiceInterface {
  id: string;
  shop: ShopInterface;
  engineer: EngineerInterface;
  part: PartInterface;
  lineItems: Array<LineItemInterface>;
  attachments: Array<AttachmentInterface>;
  subtotal: number;
  grandTotal: number;
  revision: PartRevisionInterface;
  payment: PaymentInterface;
  displayId: string;
  shopQuoteNotes: string;
  shopQuoteNumber: string;
  deliveryDate: string;
  validForDays: number;
  status: string;
  creationDate: string;
  shippingRate: number;
  platformFees: number;
  tax: number;
  requestQuote: string;
}

export interface TransactionInterface {
  id: string;
  requestQuote: string;
  job: string;
  jobDisplayId: string;
  part: string;
  revision: string;
  shop: ShopInterface;
  creationDate: string;
  cardHolderName: string;
  email: string;
  externalToken: string;
  cardType: string;
  cardLast4: string;
  amount: number;
  invoiceNumber: string;
  quote: string;
  billingAddress: string;
}

export interface QuotLogInterface {
  creationDate: string;
  action: string;
  details: string;
}

export interface QuotLogsInterface {
  logs: Array<QuotLogInterface>;
  quote: QuoteInterface;
  part: PartInterface;
  requestQuote: RfqInterface;
  job: JobInterface;
}
