import { useState } from "react";

import NewSale_Checkout from "./NewSale_Checkout";
import NewSale_Order from "./NewSale_Order";
import NewSalse_Header from "./NewSalse_Header";

const NewSalse = () => {
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const toggleCheckout = () => {
    setShowCheckout((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <NewSalse_Header />

      <div className="grow h-full">
        <NewSale_Order toggleCheckout={toggleCheckout} />
      </div>

      {showCheckout && <NewSale_Checkout toggleCheckout={toggleCheckout} />}
    </div>
  );
};

export default NewSalse;
