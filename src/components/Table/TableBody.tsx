import clsx from "clsx";
import { Link } from "react-router-dom";
import { ITableColumn } from "./Table.types";
interface ITableBodyProps {
  data: any[];
  tableColumn: ITableColumn[];
  className?: string;
  loading?: boolean;

  linkUrl?: any;
}

const TableBody = ({
  data,
  tableColumn,
  className,
  loading,

  linkUrl
}: ITableBodyProps) => {
  const renderRow = (record: any) =>
    tableColumn.map((column) => {
      if (!column || !record) {
<<<<<<< HEAD
        return ''
      }
      return <td
        key={column.key}
        className={clsx(
          "p-[14px] first:pl-[24px] last:pr-[24px] text-sm",
          className
        )}
      >
        {column.render ? column.render(record) : record[column.dataIndex]}
      </td>
=======
        return "";
      }
      return (
        <td
          key={column.key}
          className={clsx(
            "p-[14px] first:pl-[24px] last:pr-[24px] text-sm",
            className
          )}
        >
          {column.render ? column.render(record) : record[column.dataIndex]}
        </td>
      );
>>>>>>> 664d1984db3391cc4c381248f42be28d26e53cc7
    });

  const renderRowLink = (record: any) =>
    tableColumn.map((column, index) => (
      <td
        key={index}
        className={clsx(
          "p-[14px] first:pl-[24px] last:pr-[24px] text-sm",
          className
        )}
      >
        <Link to={`/${linkUrl}/${record.id}`}>
          {column.render ? column.render(record) : record[column.dataIndex]}
        </Link>
      </td>
    ));

  const renderBody = () => {
    if (data?.length === 0) {
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

    return data?.map((record: any, index) => (
      <tr
        key={index}
        className="border-b border-gray-200 text-lg leading-[27px] text-[#311339] hover:bg-emerald-50"
      >
        {linkUrl != undefined ? renderRowLink(record) : renderRow(record)}
      </tr>
    ));
  };

  return loading ? (
    <tbody>
      <tr className="animate-pulse">
        <td className="p-[20px]" colSpan={tableColumn.length}>
          <div className="h-2.5 w-[80%] bg-gray-200 rounded-full"></div>
        </td>
      </tr>
      <tr className="animate-pulse">
        <td className="p-[20px]" colSpan={tableColumn.length}>
          <div className="h-2.5 w-[70%] bg-gray-200 rounded-full"></div>
        </td>
      </tr>
      <tr className="animate-pulse">
        <td className="p-[20px]" colSpan={tableColumn.length}>
          <div className="h-2.5 w-[60%] bg-gray-200 rounded-full"></div>
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody>{renderBody()}</tbody>
  );
};

export default TableBody;
