export interface ModeratingInterface {
  moderater_id?: number;
  moderated_id?: number;
  type?: ModeratingEnum[];
  created_at?: Date;
}

export enum ModeratingEnum {
  REPORT = "Reporter",
  BLOCK = "Bloquer",
}
