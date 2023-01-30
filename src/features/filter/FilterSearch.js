import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProduct: [],
};

const FilterSearch = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { search, products } = action.payload;
      const tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProduct = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = FilterSearch.actions;

export const  selectFilteredProduct = (state) => state.filter.filteredProduct
export default FilterSearch.reducer;
