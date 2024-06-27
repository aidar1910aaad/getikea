export interface Item {
  id: number;
  parcelId: number;
  productLink: string;
  quantity: number;
  description: string;
  imageKey: string | null;
}

export interface User {
  id: number;
  email: string;
  fullName: string | null;
  address: string | null;
  IDCardNumber: string | null;
  phoneNumber: string | null;
  iin: string | null;
  recipient: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface Parcel {
  id: number;
  userId: number;
  status: string;
  imageKey: string | null;
  createdAt: string;
  updatedAt: string;
  items: Item[];
  user: User;
  [key: string]: any;
}
