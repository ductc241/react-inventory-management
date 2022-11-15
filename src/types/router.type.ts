import { ReactNode } from "react";

export default interface IRoute {
  key: number;
  path: string;
  component: ReactNode;
  children?: Array<IRoute>;
}
