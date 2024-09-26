export interface ICreateImage {
  title?: string;
  url?: string;
  key?: string;
  createdAt?: Date;
}

export interface IUpdateImage {
  title: string;
  url?: string;
  key?: string;
  createdAt?: Date;
}
