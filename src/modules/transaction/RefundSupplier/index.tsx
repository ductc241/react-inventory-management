import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "../../../components";

const RefundSupplier = () => {
  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <p className="text-xl font-semibold uppercase">
          Danh sách hàng trả nhà cung cấp
        </p>
        <Link to="/refund/new">
          <Button>Thêm đơn trả</Button>
        </Link>
      </div>

      <Table column={[]} dataSource={[]} />
    </div>
  );
};

export default RefundSupplier;
