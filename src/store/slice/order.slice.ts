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
  monney: number;
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

    deleteOrder: (
      state: InitialStateType,
      action: PayloadAction<{ id: number }>
    ) => {
      const newOrders = state.orderList.filter(
        (order) => order.id !== action.payload.id
      );

      state.orderList = newOrders;

      if (newOrders.length === 0) return;
      state.currentOrder = state.orderList[state.orderList.length - 1].id;
    },

    createOrder: (state) => {
      if (state.orderList.length === 0) {
        const newOrder: IOrder = {
          id: state.orderList.length + 1,
          products: [],
          total: 0
        };

        state.orderList = [...state.orderList, newOrder];
        state.currentOrder = newOrder.id;
        return;
      }

      if (state.orderList.length > 0) {
        const newOrder: IOrder = {
          id: state.orderList[state.orderList.length - 1].id + 1,
          products: [],
          total: 0
        };

        state.orderList = [...state.orderList, newOrder];
        state.currentOrder = newOrder.id;
      }
    },

    updateOrderItem: (
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

        state.orderList[currentOrder - 1].total += price;
      }

      if (type === "decrease") {
        if (orderUpdate.products[index].quantity > 0) {
          orderUpdate.products[index].quantity -= quantity;
          state.orderList[currentOrder - 1].total -= price;
        }
      }
    },

    deleteOrderItem: (
      state: InitialStateType,
      action: PayloadAction<IDeleteItemOrder>
    ) => {
      const newOrder = state.orderList[state.currentOrder - 1].products.filter(
        (item) => item.id !== action.payload.productId
      );

      state.orderList[state.currentOrder - 1].products = newOrder;
      state.orderList[state.currentOrder - 1].total -= action.payload.monney;
    }
  }
});

export default orderSlice;
export const {
  selectOrder,
  deleteOrder,
  createOrder,
  updateOrderItem,
  deleteOrderItem
} = orderSlice.actions;
