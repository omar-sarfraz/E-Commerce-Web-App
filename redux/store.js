import { configureStore } from "@reduxjs/toolkit";
import appleProductReducer from "./slices/appleProductSlice";
import samsungProductReducer from "./slices/samsungProductSlice";
import xiaomiProductReducer from "./slices/xiaomiProductSlice";
import bannerProductReducer from "./slices/bannerProductSlice";
import cartReducer from "./slices/cartSlice";
import mobileReducer from "./slices/mobilesSlice";
import headphoneReducer from "./slices/headphonesSlice";
import earphoneReducer from "./slices/earphonesSlice";
import cartOpen from "./slices/cartOpen";
import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";
import filteredDataReducer from "./slices/filterDataSlice";
import searchDataReducer from "./slices/searchDataSlice";

export const store = configureStore({
  reducer: {
    appleProduct: appleProductReducer,
    samsungProduct: samsungProductReducer,
    xiaomiProduct: xiaomiProductReducer,
    bannerProduct: bannerProductReducer,
    cart: cartReducer,
    mobile: mobileReducer,
    headphone: headphoneReducer,
    earphone: earphoneReducer,
    cartOpen: cartOpen,
    user: userReducer,
    products: productsReducer,
    searchData: searchDataReducer,
    filterData: filteredDataReducer,
  },
});
