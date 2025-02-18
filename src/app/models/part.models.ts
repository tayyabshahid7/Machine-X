import { AttachmentInterface } from './general.models';

export interface PartRevisionInterface {
  id: string;
  name: string;
  shortDescription: string;
  notes: string;
  creationDate: string;
  part: string;
  status: string;
  attachments: AttachmentInterface[];
}

export interface PartInterface {
  id: string;
  name: string;
  number: string;
  notes: string;
  status: string;
  creationDate: string;
  archiveDate?: string | null;
  engineer?: string;
}

export interface AddPartInputInterface {
  name: string;
  number: string;
  notes: string;
  attachments: [];
}
