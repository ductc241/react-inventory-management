import clsx from "clsx";
import { ITableProps } from "../../components/Table/Table.types";
import TableBody from "../../components/Table/TableBody";
import TableHeader from "../../components/Table/TableHeader";

const Table = ({
  dataSource,
  column,
  textAlign = "center",
  className,
  loading,
  link,
  linkUrl
}: ITableProps) => {
  return (
    <div className="overflow-hidden shadow-md rounded-lg border border-gray-200">
      <table className={clsx("w-full", className)}>
        <TableHeader tableHead={column} className={`text-${textAlign}`} />
        <TableBody
          tableColumn={column}
          data={dataSource}
          className={`text-${textAlign}`}
          loading={loading}
          link={link}
          linkUrl={linkUrl}
        />
      </table>
    </div>
  );
};

export default Table;
