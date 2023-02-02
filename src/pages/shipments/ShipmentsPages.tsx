import ShipmentsTable from "../../modules/transaction/ImportShipments/shipmentsTable";

const ShipmentPage = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-[1fr,4fr] gap-5">
        <div>side bar</div>
        <div>
          <ShipmentsTable />
        </div>
      </div>
    </div>
  );
};

export default ShipmentPage;
