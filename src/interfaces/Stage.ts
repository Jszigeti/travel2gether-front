export interface StageInterface {
  id?: number;
  title: string;
  description: string;
  dateFrom: string;
  dateTo: string;
  pathPicture: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  groupId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
