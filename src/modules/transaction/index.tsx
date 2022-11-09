import TransactionTable from "./transactionTable/transactionTable";

const Transaction = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-[1fr,4fr] gap-5">
        <div>side bar</div>
        <div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
