export type ICategory = {
  id?: number;
  name: string;
  parent_id?: number
}
export enum CategoryAction {
  ADD,
  EDIT,
  REMOVE
}
