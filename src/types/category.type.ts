export type ICategory = {
  id?: number;
  name: string;
  parent_id?: number;
};
export enum CategoryAction {
  // eslint-disable-next-line no-unused-vars
  ADD,
  // eslint-disable-next-line no-unused-vars
  EDIT,
  // eslint-disable-next-line no-unused-vars
  REMOVE
}
