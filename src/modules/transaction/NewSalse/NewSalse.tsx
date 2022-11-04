import NewSale_Order from "./NewSale_Order";
import NewSalse_Header from "./NewSalse_Header";

const NewSalse = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <NewSalse_Header />

      <div className="grow h-full">
        <NewSale_Order />
      </div>
    </div>
  );
};

export default NewSalse;
