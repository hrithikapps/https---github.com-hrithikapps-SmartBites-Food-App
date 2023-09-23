import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      const isPresent = state.items.find(
        (item) => item.id == action.payload.id
      );
      isPresent
        ? state.items.find((item) => item.qty++)
        : state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    handleDecrement: (state, action) => {
      state.items.map((item) => {
        if (item.id == action.payload.id) {
          if (item.qty > 1) {
            item.qty--;
          } else {
            state.items = state.items.filter(
              (item) => item.id !== action.payload.id
            );
          }
        }
      });
    },
    handleIncrement: (state, action) => {
      state.items.map((item) => {
        if (item.id == action.payload.id) {
          item.qty++;
        }
      });
    },
  },
});
export const {
  addItem,
  removeItem,
  clearCart,
  handleDecrement,
  handleIncrement,
} = cartSlice.actions;

export default cartSlice.reducer;
