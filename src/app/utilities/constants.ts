export const SUPPORTED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'pdf', 'unknown'] as const;


export const AddressType = {
  BILLING: 'billing',
  SHIPPING: 'shipping',
} as const;

export const PartStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  IN_PROGRESS: 'in_progress',
  ARCHIVED: 'archived',
  COMPLETED: 'completed',
} as const;

export const RfqStatus = {
  ACCEPTING_QUOTES: 'accepting_quotes',
  NOT_ACCEPTING_QUOTES: 'not_accepting_quotes',
  ARCHIVED: 'archived',
} as const;

export const QuoteStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  NOT_SELECTED: 'not_selected',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;

export const JobStatus = {
  PENDING: 'pending',
  IN_WORK: 'in_work',
  SHIPPED: 'shipped',
} as const;
