import { ReactNode } from "react";

export interface ITableProps {
  dataSource: any;
  column: ITableColumn[];
  textAlign?: "left" | "center" | "right";
  className?: string;
  loading?: boolean;

  linkUrl?: string;
}

export interface ITableColumn {
  key: string | number;
  title: string;
  dataIndex: string;
  render?: (record: any, index?: any) => ReactNode;
}
