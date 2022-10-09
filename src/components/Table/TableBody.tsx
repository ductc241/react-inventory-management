import clsx from "clsx";
import { Spinner } from "..";

import { ITableColumn } from "./Table.types";

interface ITableBodyProps {
  data: any[];
  tableColumn: ITableColumn[];
  className?: string;
  loading?: boolean;
}

const TableBody = ({
  data,
  tableColumn,
  className,
  loading
}: ITableBodyProps) => {
  const renderRow = (record: any) =>
    tableColumn.map((column) => (
      <td
        key={column.key}
        className={clsx(
          "p-[14px] first:pl-[24px] last:pr-[24px] text-sm",
          className
        )}
      >
        {column.render
          ? column.render(record[column.dataIndex])
          : record[column.dataIndex]}
      </td>
    ));

  const renderBody = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={tableColumn.length}
            className="py-32 text-center font-medium"
          >
            No Data
          </td>
        </tr>
      );
    }

    return data.map((record: any, index) => (
      <tr
        key={index}
        className="border-b border-[#f0f0f0] last:border-none text-lg leading-[27px] text-[#311339] font-semibold"
      >
        {renderRow(record)}
      </tr>
    ));
  };

  return loading ? (
    <tr>
      <td colSpan={tableColumn.length} className="py-32">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </td>
    </tr>
  ) : (
    <tbody>{renderBody()}</tbody>
  );
};

export default TableBody;
