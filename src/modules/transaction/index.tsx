import TransactionTable from "./transactionTable/transactionTable";

const Transaction = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-[1fr,3fr]">
        <div>side bar</div>
        <div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
