export interface EngineeerAddressInterface {
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

export interface EngineerProfileInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: EngineeerAddressInterface[];
  company: string;
  engBio: string;
  avatar: string | null;
}
