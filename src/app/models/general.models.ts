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
  revision: string;
}

export interface AccessTokenResponseInterface {
  access: string;
}
