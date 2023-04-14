import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deals: []
}
export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setDeals: (state, action) => {
      state = action.payload
      return state;
    },
    addDeal: (state, action) => {
      state.push({
        id: action.payload.id,
        description: action.payload.description,
        done: action.payload.done
      })
    },

  }
});
export const { setDeals, addDeal } = dealsSlice.actions;
export default dealsSlice.reducer;