import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface IOrder {
  id: number;
  products: IOrderItem[];
  total: number;
}

interface InitialStateType {
  currentOrder: number;
  orderList: IOrder[];
}

interface IUpdateOrder {
  type: "increase" | "decrease";
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface IDeleteItemOrder {
  productId: number;
}

const initialState: InitialStateType = {
  currentOrder: 1,
  orderList: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<{ id: number }>) => {
      state.currentOrder = action.payload.id;
    },

    createOrder: (state) => {
      const newOrder: IOrder = {
        id: state.orderList.length + 1,
        products: [],
        total: 0
      };

      state.orderList = [...state.orderList, newOrder];
      state.currentOrder = newOrder.id;
    },

    updateOrder: (
      state: InitialStateType,
      action: PayloadAction<IUpdateOrder>
    ) => {
      const { orderList, currentOrder } = state;
      const { type, productId, name, price, quantity } = action.payload;

      const orderUpdate = orderList[currentOrder - 1];
      const index = orderUpdate.products.findIndex(
        (item) => item.id === productId
      );

      if (type === "increase") {
        if (index >= 0) {
          orderUpdate.products[index].quantity += quantity;
        } else {
          orderUpdate.products.push({
            id: productId,
            name: name,
            price: price,
            quantity: quantity
          });
        }
      }

      if (type === "decrease") {
        orderUpdate.products[index].quantity > 0 &&
          (orderUpdate.products[index].quantity -= quantity);
      }
    },

    deleteItemOrder: (
      state: InitialStateType,
      action: PayloadAction<IDeleteItemOrder>
    ) => {
      const newOrder = state.orderList[state.currentOrder - 1].products.filter(
        (item) => item.id !== action.payload.productId
      );

      state.orderList[state.currentOrder - 1].products = newOrder;
    }
  }
});

export default orderSlice;
export const { selectOrder, createOrder, updateOrder, deleteItemOrder } =
  orderSlice.actions;
