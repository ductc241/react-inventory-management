import clsx from "clsx";

import { ITableProps } from "./Table.types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  dataSource,
  column,
  textAlign = "left",
  className,
  loading
}: ITableProps) => {
  return (
    <table className={clsx("w-full border border-gray-200", className)}>
      <TableHeader tableHead={column} className={`text-${textAlign}`} />
      <TableBody
        tableColumn={column}
        data={dataSource}
        className={`text-${textAlign}`}
        loading={loading}
      />
    </table>
  );
};

export default Table;
