import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // action we need
    addToBasket: (state, action) => {
      state.items = [...state.items , action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if(index >= 0){
        // go to basket and find the item by index and remove it by 1.
        newBasket.splice(index , 1);
      }else{
        console.warn(
          `cant remove product (id ${action.payload.id} ) as its not in basket`
        )
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;// Now can use then throw the App

// here how we pull data from global store > slice
export const selectItems = (state) => state.basket.items; 
 // reduce() method return a single and accumulated result. 
export const selectTotal = (state) => state.basket.items.reduce((total , item) => total + item.price,0);

export default basketSlice.reducer;
