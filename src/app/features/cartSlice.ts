import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/interface";
import { RootState } from "../store";
import { AddItemToShoppingCart } from "../../utils/functions";
import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast()

interface ICartItem extends IProduct {
  quantity: number
}

interface IInitialState {
  cartProducts: ICartItem[];
}

const initialState: IInitialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add product to cart
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.cartProducts = AddItemToShoppingCart(action.payload, state.cartProducts);
    },
    // increase product quantity
    increaseProduct: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((product) => product.id === action.payload);
      if (product) {
        product.quantity += 1
        // product.price*=product.quantity
      }
    },
    // decrease product quantity
    decreaseProduct: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((product) => product.id === action.payload)
      if (product) {
        product.quantity -= 1
      }
    },
    // remove product from cart
    removeProduct: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload)
    },
    // clear all products
    clearAll:(state)=>{
      state.cartProducts=[]
      toast({
        title: "cart is empty",
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
    }

  },
});

export const { addToCart, increaseProduct, decreaseProduct,removeProduct,clearAll } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cartProducts;
export default cartSlice.reducer;

