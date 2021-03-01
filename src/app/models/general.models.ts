import { SUPPORTED_FILE_TYPES } from '../utilities/constants';

export interface PaginatedRequestInterface {
  page: number;
  pageSize: number;
}

export interface PaginatedObjectInterface<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface AttachmentInterface {
  id: string;
  creationDate: string;
  file: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  revision?: string;
  returnedQuote?: string;
}

export interface UserAddressInterface {
  id: string;
  type: string;
  isDefault: boolean;
  createdOn: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  engineer: string;
}

export interface EngineerInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  avatar?: any;
}

export interface AccessTokenResponseInterface {
  access: string;
}

export type FileType = typeof SUPPORTED_FILE_TYPES[number];
