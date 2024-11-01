import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/interface";
import { RootState } from "../store";

interface IInitialState {
  cartProducts: IProduct[];
}
const initialState: IInitialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cartProducts;
export default cartSlice.reducer;


