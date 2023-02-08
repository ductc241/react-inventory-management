import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, TextField } from "../../components";

import { listRecei } from "../../api/receipt.api";
import { listShipments } from "../../api/shipments";
import { ITableColumn } from "../../components/Table/Table.types";
import IOption from "../../types/option.model";
import moment from "moment";
import ProductFilter from "./NewSalse/ProductFilter";
import { date } from "yup/lib/locale";

const ImportColumn: ITableColumn[] = [
  {
    key: 1,
    title: "ID | Ngày",
    dataIndex: "id",
    render: (item: any) => {
      return (
        <>
          <p className="text-center mb-2 hover:text-blue-500">
            {item?.import_code}
          </p>
          <p className="text-center">{item?.import_date}</p>
        </>
      );
    }
  },
  {
    title: "Nhà cung cấp",
    dataIndex: "supplier_name",
    key: 2,
    render: (item: any) => (
      <>
        {item.import_type == 1 && (
          <>
            <p className="text-green-500">Nhập nhà cung cấp</p>
            <p>{item.supplier_name}</p>
          </>
        )}
        {item.import_type == 2 && (
          <>
            <p className="text-green-500">Nhập khác</p>
          </>
        )}
      </>
    )
  },
  {
    title: "Thời gian",
    dataIndex: "import_date",
    key: 3
  },
  {
    title: "Tổng số tiền nhập hàng",
    dataIndex: "import_price_totail",
    key: 4,
    render: ({ import_price_totail }) => (
      <span>
        {new Intl.NumberFormat("de-DE").format(import_price_totail)} VND
      </span>
    )
  },
  {
    title: "Ghi chú",
    dataIndex: "description",
    key: 5
  }
];

const ExportColumn: ITableColumn[] = [
  {
    key: 1,
    title: "ID | Ngày",
    dataIndex: "id",
    render: (item: any) => {
      return (
        <>
          <p className="text-center mb-2 hover:text-blue-500">
            {item?.export_code}
          </p>
          <p className="text-center">{item?.export_date}</p>
        </>
      );
    }
  },

  {
    key: 2,
    title: "Loại ",
    dataIndex: "",
    render: (item: any) => (
      <>
        {item.export_type == 1 && (
          <>
            <p className="text-red-500">Xuất khách hàng</p>
            <p>{item.seller_name}</p>
          </>
        )}
        {item.export_type == 2 && (
          <>
            <p className="text-red-500">Xuất khác</p>
          </>
        )}
        {item.export_type == 3 && (
          <>
            <p className="text-red-500">Xuất bán lẻ</p>
          </>
        )}
      </>
    )
  },

  {
    key: 3,
    title: "Số lượng",
    dataIndex: "quantity"
  },
  {
    key: 4,
    title: "Tổng tiền",
    dataIndex: "totall_price",
    render: (item: any) => <p>{item?.totall_price.toLocaleString("en")}</p>
  },
  {
    key: 5,
    title: "Người tạo",
    dataIndex: "user_name"
  },
  {
    key: 6,
    title: "Ghi chú",
    dataIndex: "description"
  }
];

const TransactionTable = () => {
  const listType: IOption[] = [
    { label: "Đơn xuất", value: "export" },
    { label: "Đơn nhập", value: "import" }
  ];

  const [data, setData] = useState<any[]>([]);
  const [dataFilter, setDataFilter] = useState<any[] | null>(null);
  const [column, setColumn] = useState(ExportColumn);

  const [linkDetail, setLinkDetail] = useState<string>("");
  const [type, setType] = useState<IOption>(listType[0]);
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const getInitData = async () => {
      if (type.value === "export") {
        const { data } = await listRecei();

        setData(data.data);
        setColumn(ExportColumn);
        setLinkDetail("inventory/export-shipment");
      }

      if (type.value === "import") {
        const { data } = await listShipments();

        setData(data.data);
        setColumn(ImportColumn);
        setLinkDetail("inventory/import-shipment");
      }
    };

    getInitData();
  }, [type]);

  const getInitData = async () => {
    if (type.value === "export") {
      const { data } = await listRecei();

      const dataList = data.data.filter(
        (item: any) =>
          moment(`${item.updated_at}`).format("DD-MM-YYYY") <
            moment(
              `${Number(startDate.split("-")[2]) + 1}/${
                endDate.split("-")[1]
              }/${endDate.split("-")[0]}`
            ).format("DD-MM-YYYY") &&
          moment(`${item.updated_at}`).format("DD-MM-YYYY") >
            moment(
              `${Number(startDate.split("-")[2]) - 1}/${
                startDate.split("-")[1]
              }/${startDate.split("-")[0]}`
            ).format("DD-MM-YYYY")
      );
      setData(dataList);
      setColumn(ExportColumn);
      setLinkDetail("inventory/export-shipment");
    }

    if (type.value === "import") {
      const { data } = await listShipments();

      const dataList = data.data.filter(
        (item: any) =>
          moment(`${item.updated_at}`).format("DD-MM-YYYY") <
            moment(
              `${Number(endDate.split("-")[2]) + 1}/${endDate.split("-")[1]}/${
                endDate.split("-")[0]
              }`
            ).format("DD-MM-YYYY") &&
          moment(`${item.updated_at}`).format("DD-MM-YYYY") >
            moment(
              `${Number(startDate.split("-")[2]) - 1}/${
                startDate.split("-")[1]
              }/${startDate.split("-")[0]}`
            ).format("DD-MM-YYYY")
      );
      setData(dataList);
      setColumn(ImportColumn);
      setLinkDetail("inventory/import-shipment");
    }
  };

  const filter = async () => {
    if (search && !startDate && !endDate) {
      if (type.value === "export") {
        const { data } = await listRecei();
        const dataList = data.data.filter((item: any) =>
          item.export_code.toLowerCase().includes(search)
        );
        setData(dataList);
        setColumn(ExportColumn);
        setLinkDetail("inventory/export-shipment");
      }

      if (type.value === "import") {
        const { data } = await listShipments();
        const dataList = data.data.filter((item: any) =>
          item.import_code.toLowerCase().includes(search)
        );
        setData(dataList);
        setColumn(ImportColumn);
        setLinkDetail("inventory/import-shipment");
      }
    }
    if (!search && startDate && endDate) {
      getInitData();
    }
    if (search && startDate && endDate) {
      const { data } = await listRecei();
      const dataList = data.data.filter((item: any) =>
        item.export_code.toLowerCase().includes(search)
      );
      if (type.value === "export") {
        const dataItime = dataList.filter(
          (item: any) =>
            moment(`${item.updated_at}`).format("DD-MM-YYYY") <
              moment(
                `${Number(endDate.split("-")[2]) + 1}/${
                  endDate.split("-")[1]
                }/${endDate.split("-")[0]}`
              ).format("DD-MM-YYYY") &&
            moment(`${item.updated_at}`).format("DD-MM-YYYY") >
              moment(
                `${Number(startDate.split("-")[2]) - 1}/${
                  startDate.split("-")[1]
                }/${startDate.split("-")[0]}`
              ).format("DD-MM-YYYY")
        );
        setData(dataItime);
        setColumn(ExportColumn);
        setLinkDetail("inventory/export-shipment");
      }

      if (type.value === "import") {
        const dataItime = dataList.filter(
          (item: any) =>
            moment(`${item.updated_at}`).format("DD-MM-YYYY") <
              moment(
                `${Number(startDate.split("-")[2] + 1)}/${
                  endDate.split("-")[1]
                }/${endDate.split("-")[0]}`
              ).format("DD-MM-YYYY") &&
            moment(`${item.updated_at}`).format("DD-MM-YYYY") >
              moment(
                `${Number(startDate.split("-")[2]) - 1}/${
                  startDate.split("-")[1]
                }/${startDate.split("-")[0]}`
              ).format("DD-MM-YYYY")
        );
        setData(dataItime);
        setColumn(ImportColumn);
        setLinkDetail("inventory/import-shipment");
      }
    }
  };

  const handleFilter = () => {
    const productsFilter: any[] = [];

    if (search) {
      if (type.value === "export") {
        const filter = data.find((product) => product.export_code === search);
        productsFilter.push({ ...filter });
      }

      if (type.value === "import") {
        const filter = data.find((product) => product.import_code === search);
        productsFilter.push({ ...filter });
      }
    }

    if (startDate) {
      if (type.value === "export") {
        const filter = data.filter((product) =>
          moment(startDate).isBefore(product.export_date)
        );
        productsFilter.push(...filter);
      }

      if (type.value === "import") {
        const filter = data.filter((product) =>
          moment(startDate).isBefore(product.import_date)
        );
        productsFilter.push(...filter);
      }
    }

    if (endDate) {
      if (type.value === "export") {
        const filter = productsFilter.filter((product) =>
          moment(endDate).isAfter(product.export_date)
        );
        productsFilter.push(...filter);
      }

      if (type.value === "import") {
        const filter = productsFilter.filter((product) =>
          moment(endDate).isAfter(product.import_date)
        );
        productsFilter.push(...filter);
      }
    }

    setDataFilter(productsFilter);
  };

  const handleReset = () => {
    setDataFilter(null);
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="bg-white">
      <p className="mb-5 text-xl font-semibold uppercase">
        Danh sách xuất, nhập kho
      </p>

      <div className="mb-3 flex">
        <TextField
          type="text"
          placeholder="Mã phiếu"
          name="id"
          containerClass="mr-5"
          onChange={(e: any) => setSearch(e.target.value)}
          value={search}
        />

        <Select
          options={listType}
          option={type}
          handleClickChange={(option) => {
            setType(option);
            setStartDate("");
            setSearch("");
            setEndDate("");
          }}
          containerClass="w-[250px]"
        />

        <div className="ml-5">
          <TextField
            name="import_Date"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
        </div>
        <div className="ml-5">
          <TextField
            name="export_date"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>

        <Button className="ml-5" onClick={handleFilter}>
          Lọc
        </Button>

        <Button className="ml-5" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="mt-5 flex gap-x-5">
        {/* {user.role_id === 1 ? (
          <Link
            to="/export_shipment"
            className="focus-visible:outline-2 focus-visible:outline-orange-secondary px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium max-w-fit bg-green-500"
          >
            Thêm Mới
          </Link>
        ) : (
          <div
            onClick={() => {
              toast.error("bạn không có quyền thêm");
            }}
            className="focus-visible:outline-2 focus-visible:outline-orange-secondary px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium max-w-fit bg-green-500"
          >
            Thêm Mới
          </div>
        )} */}
        <Link to="/inventory/import-shipment/new">
          <Button>Thêm phiếu nhập</Button>
        </Link>

        <Link to="/inventory/export-shipment/new">
          <Button>Thêm phiếu xuất</Button>
        </Link>
      </div>

      <div className="w-full mt-10">
        {dataFilter ? (
          <Table column={column} dataSource={dataFilter} linkUrl={linkDetail} />
        ) : (
          <Table column={column} dataSource={data} linkUrl={linkDetail} />
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
