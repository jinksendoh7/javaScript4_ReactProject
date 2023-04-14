import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deals: []
}
export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state = action.payload
      return state;
    },
  }
});
export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;