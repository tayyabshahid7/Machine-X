import { PartInterface, PartRevisionInterface } from './part.models';
import { AttachmentInterface, EngineerInterface, UserAddressInterface } from './general.models';
import { RfqStatus } from '../utilities/constants';

type RfqStatusKeys = keyof typeof RfqStatus;
export type RfqStatusType = typeof RfqStatus[RfqStatusKeys];

export interface RfqInterface {
  id: string;
  revision: PartRevisionInterface;
  part: PartInterface;
  billingAddress?: UserAddressInterface;
  shippingAddress?: UserAddressInterface;
  submissionsCount: number;
  remainingSeconds: number;
  engineer: EngineerInterface;
  displayId: string;
  partQuantity: number;
  materialType: string;
  quoteNeededInDays: number;
  partDateNeeded: string;
  creationDate: string;
  notes: string;
  status: RfqStatusType;
  attachments?: AttachmentInterface[];
}
