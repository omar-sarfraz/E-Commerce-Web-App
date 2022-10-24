import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    products: [],
    totalPrice: 0,
    totalProducts: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const doProductExist = state.value.products.find(
        (item) => item._id === action.payload._id
      );
      if (doProductExist) {
        state.value.products.forEach((item, index) => {
          if (item._id === action.payload._id) {
            state.value.products[index].quantity += action.payload.quantity;
            state.value.totalPrice +=
              action.payload.quantity * action.payload.price;
            return;
          }
        });
      } else {
        state.value.products.push(action.payload);
        state.value.totalPrice +=
          action.payload.quantity * action.payload.price;
        state.value.totalProducts += 1;
      }
    },
    increaseQty: (state, action) => {
      state.value.products.forEach((item, index) => {
        if (item._id === action.payload._id) {
          state.value.products[index].quantity += 1;
          state.value.totalPrice += action.payload.price;
          return;
        }
      });
    },
    decreaseQty: (state, action) => {
      state.value.products.forEach((item, index) => {
        if (item._id === action.payload._id) {
          if (state.value.products[index].quantity === 1) return;
          state.value.products[index].quantity -= 1;
          state.value.totalPrice -= action.payload.price;
          return;
        }
      });
    },
    removeProduct: (state, action) => {
      let itemToRemove;
      state.value.products.forEach((item, index) => {
        if (item._id === action.payload._id) {
          itemToRemove = index;
        }
      });
      let priceToDecrease =
        state.value.products[itemToRemove].quantity *
        state.value.products[itemToRemove].price;
      state.value.totalProducts -= 1;
      state.value.totalPrice -= priceToDecrease;
      state.value.products.splice(itemToRemove, 1);
    },
    clearCart: (state, action) => {
      state.value.products = [];
      state.value.totalPrice = 0;
      state.value.totalProducts = 0;
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addProduct,
  increaseQty,
  decreaseQty,
  removeProduct,
  clearCart,
} = actions;

export default reducer;
