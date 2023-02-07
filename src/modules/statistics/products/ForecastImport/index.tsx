import { useEffect, useState } from "react";
import moment from "moment";
import staticalServices from "../../../../api/statical.api";
import { Button, Table, TextField } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";

const ForecastImport = () => {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const [oldData, setOldData] = useState<any>([]);
  const [data, setData] = useState<any[]>([]);

  const [dateStart, setDateStart] = useState<string>(
    moment().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [dateEnd, setDateEnd] = useState<string>(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const totalDays = moment
    .duration(
      moment(dateEnd, "YYYY-MM-DD").diff(moment(dateStart, "YYYY-MM-DD"))
    )
    .asDays();

  const StaticalColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (item: any) => <p>{item.product.name}</p>
    },
    {
      key: 2,
      title: "SL bán năm trước",
      dataIndex: "name",
      render: (item, index) => (
        <p>{oldData.length > 0 ? oldData[index].totail_export : 0}</p>
      )
    },
    {
      key: 3,
      title: `Trung bình năm trước (${totalDays} ngày)`,
      dataIndex: "name",
      render: (_, index) => (
        <p>
          {oldData.length > 0
            ? (oldData[index].totail_export / totalDays).toFixed(2)
            : 0}
        </p>
      )
    },
    {
      key: 4,
      title: "Sl bán hiện tại",
      dataIndex: "totail_export",
      render: (item) => <p>{item.totail_export}</p>
    },
    {
      key: 5,
      title: `Trung bình hiện tại (${totalDays} ngày)`,
      dataIndex: "name",
      render: (item) => <p>{(item.totail_export / totalDays).toFixed(2)}</p>
    },
    {
      key: 6,
      title: "Chênh lệch",
      dataIndex: "name"
    }
  ];

  const ForecastNowColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (item: any) => <p>{item.product.name}</p>
    },
    {
      key: 2,
      title: "Tồn",
      dataIndex: "name",
      render: (item: any) => <p>{item.product.quantity}</p>
    },
    {
      key: 3,
      title: `SL bán ra trung bình / ${totalDays} ngày`,
      dataIndex: "name",
      render: (item) => <p>{(item.totail_export / totalDays).toFixed(2)}</p>
    },
    {
      key: 4,
      title: `SL bán ${totalDays} ngày tới`,
      dataIndex: "name",
      render: (item) => (
        <p>{Number((item.totail_export / totalDays).toFixed(2)) * 30}</p>
      )
    },
    {
      key: 5,
      title: "Số lượng cần nhập tối thiểu",
      dataIndex: "name"
    },
    {
      key: 6,
      title: "Số ngày tồn đủ để bán",
      dataIndex: "name",
      render: (item) => (
        <p>
          {Number(
            item.product.quantity /
              Number((item.totail_export / totalDays).toFixed(2))
          ).toFixed(1)}{" "}
          ngày
        </p>
      )
    }
  ];

  useEffect(() => {
    const getStaticalData = async () => {
      if (!dateStart && !dateEnd) return;

      const { data } = await staticalServices.getBillOfProducts({
        startDay: dateStart,
        endDay: dateEnd
      });

      const { data: oldData } = await staticalServices.getBillOfProducts({
        startDay: moment(dateStart).subtract(1, "years").format("YYYY-MM-DD"),
        endDay: moment(dateEnd).subtract(1, "years").format("YYYY-MM-DD")
      });

      setData(data);
      setOldData(oldData);
    };

    getStaticalData();
  }, [dateEnd, dateStart]);

  return (
    <>
      <p className="mb-5 text-xl font-semibold uppercase">Dự báo nhập hàng</p>

      <div className="mb-10 flex gap-x-10">
        <div className="flex items-center">
          <p className="mr-5">Chu kỳ</p>
          <TextField
            type="date"
            name="date-start"
            className="rounded-r-none"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <TextField
            type="date"
            name="date-end"
            className="rounded-l-none"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <p className="mr-5">Sản phẩm</p>
          <TextField
            name="name"
            value={productId}
            onChange={(value) => console.log(value)}
          />
        </div>

        <Button>Lọc</Button>
      </div>

      <div className="mb-10">
        <p className="mb-5 text-[16px] font-semibold uppercase">
          Thống kê số lượng xuất ra hằng năm
        </p>

        {oldData && <Table column={StaticalColumn} dataSource={data} />}
      </div>

      <div className="mb-10">
        <p className="mb-5 text-[16px] font-semibold uppercase">
          Dự báo số lượng sẽ nhập
        </p>
        <Table column={ForecastNowColumn} dataSource={data} />
      </div>
    </>
  );
};

export default ForecastImport;
