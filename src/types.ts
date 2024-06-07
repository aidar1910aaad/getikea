export interface Item {
  id?: number;
  parcelId?: number;
  productLink: string;
  quantity: number;
  description: string;
}

export interface Parcel {
  id: number;
  trackingNumber: string;
  userId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
  content?: string;
  address?: string;
  date?: string;
  code?: string;
  recipient?: string;
  iin?: string;
  fio?: string;
  parcelKey: string;
}
