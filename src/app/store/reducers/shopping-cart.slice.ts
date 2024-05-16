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
      state.items = state.items.filter((item) => item !== itemToRemove);
    },
  },
});

export const { addToCart, removeFromCart } = shoppingCartSlice.actions;
export const selectShoppingCartState = (state: RootState) =>
  state.shoppingCart.items;
export default shoppingCartSlice.reducer;
