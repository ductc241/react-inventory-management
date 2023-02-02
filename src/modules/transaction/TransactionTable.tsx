import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Select, Table, TextField } from "../../components";

import { listRecei } from "../../api/receipt.api";
import { listShipments } from "../../api/shipments";
import { ITableColumn } from "../../components/Table/Table.types";
import IOption from "../../types/option.model";

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
    title: "Trạng thái",
    dataIndex: "status",
    key: 5,
    render: ({ status }) => {
      return (
        <>
          {status === true ? (
            <div className="text-green-500">Đã thanh toán</div>
          ) : (
            <div className="text-red-500">Chưa thanh toán</div>
          )}
        </>
      );
    }
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
            <p className="text-red-500">Xuất nhà cung cấp</p>
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
    dataIndex: ""
  }
];

const TransactionTable = () => {
  const listType: IOption[] = [
    { label: "Đơn xuất", value: "export" },
    { label: "Đơn nhập", value: "import" }
  ];

  const [data, setData] = useState<any>([]);
  const [column, setColumn] = useState(ExportColumn);

  const [linkDetail, setLinkDetail] = useState<string>("");
  const [type, setType] = useState<IOption>(listType[0]);

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

  // const filter = async () => {
  //   const { data } = await listRecei();
  //   const id: any = document.getElementById("id");
  //   const export_date: any = document.getElementById("export_date");
  //   const import_Date: any = document.getElementById("import_Date");
  //   const countries: any = document.getElementById("countries");

  //   if (
  //     id.value &&
  //     !import_Date.value &&
  //     !export_date.value &&
  //     countries.value == "Loại"
  //   ) {
  //     const datas: any = [];
  //     for (let i = 0; i < data.data.length; i++) {
  //       if (data.data[i].id == Number(id.value)) {
  //         datas.push(data.data[i]);
  //       }
  //     }
  //     setData(datas);
  //   }

  //   if (
  //     !id.value &&
  //     import_Date.value &&
  //     export_date.value &&
  //     countries.value == "Loại"
  //   ) {
  //     const datas: any = [];
  //     const startDate: any = Date.parse(import_Date.value);
  //     const endDate: any = Date.parse(export_date.value);
  //     if (startDate > endDate) {
  //       setMessenger("ngày kết thúc phải lớn hơn ngày bắt đầu");
  //     } else {
  //       const { data: datass } = await listRecei();
  //       for (let i = 0; i < datass.data.length; i++) {
  //         const shortDate_2: any = new Date(
  //           `${datass.data[i].created_at.split("/")[1]}/${
  //             datass.data[i].created_at.split("/")[0]
  //           }/${datass.data[i].created_at.split("/")[2]}`
  //         );

  //         const date = Date.parse(shortDate_2);
  //         if (date > startDate && date < endDate) {
  //           datas.push(data.data[i]);
  //         }
  //       }
  //       setData(datas);
  //     }
  //   }

  //   if (
  //     (id.value && import_Date.value) ||
  //     (id.value && export_date.value) ||
  //     (countries.value != "Loại" && id.value) ||
  //     (countries.value != "Loại" && import_Date.value && !export_date.value) ||
  //     (countries.value != "Loại" && export_date.value && !import_Date.value)
  //   ) {
  //     setMessenger("Không Lọc được");
  //   }

  //   if (
  //     !id.value &&
  //     !import_Date.value &&
  //     !export_date.value &&
  //     countries.value == "Loại"
  //   ) {
  //     setData(data.data);
  //     setMessenger("");
  //   }

  //   if (!id.value && countries.value != "Loại" && import_Date && export_date) {
  //     const datas: any = [];
  //     for (let i = 0; i < data.data.length; i++) {
  //       if (data.data[i].export_type == Number(countries.value)) {
  //         datas.push(data.data[i]);
  //       }
  //     }
  //     setData(datas);
  //   }
  //   id.value = "";
  //   import_Date.value = "";
  //   export_date.value = "";
  // };

  return (
    <div className="bg-white">
      <p className="mb-5 text-xl font-semibold uppercase">
        Danh sách xuất, nhập kho
      </p>

      <div className="mb-3 flex">
        <TextField
          type="number"
          placeholder="Mã phiếu"
          name="id"
          id="id"
          containerClass="mr-5"
        />

        <Select
          options={listType}
          option={type}
          handleClickChange={(option) => setType(option)}
          containerClass="w-[250px]"
        />

        <div className="ml-5">
          <TextField name="import_Date" type="date" id="import_Date" />
        </div>
        <div className="ml-5">
          <TextField name="export_date" type="date" id="export_date" />
        </div>

        <Button className="ml-5">Lọc</Button>
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
        <Table column={column} dataSource={data} linkUrl={linkDetail} />
      </div>
    </div>
  );
};

export default TransactionTable;
