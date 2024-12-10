export interface ModeratingInterface {
  moderaterId?: number;
  moderatedId?: number;
  type?: ModeratingEnum[];
  createdAt?: Date;
}

export enum ModeratingEnum {
  REPORT = "Reporter",
  BLOCK = "Bloquer",
}
