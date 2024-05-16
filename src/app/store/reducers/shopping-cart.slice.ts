// ** Redux Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "@/app/types/item";
import { RootState } from "@/app/store";

interface CartType {
  items: ItemType[];
}

const initialState: CartType = {
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemType>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    removeFromCart(state, action: PayloadAction<ItemType>) {
      const itemToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemToRemove.id);
    },
    increment(state, action: PayloadAction<ItemType>) {
      const itemToIncrement = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
      }
    },
    decrement(state, action: PayloadAction<ItemType>) {
      const itemToDecrement = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToDecrement) {
        itemToDecrement.quantity -= 1;
        if (itemToDecrement.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== itemToDecrement.id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement } =
  shoppingCartSlice.actions;
export const selectShoppingCartState = (state: RootState) =>
  state.shoppingCart.items;
export default shoppingCartSlice.reducer;
