import { configureStore } from '@reduxjs/toolkit';
import dealsReducer from './slices/dealsSlice';
import userReducer from './slices/usersSlice';
import customersSlice from './slices/customersSlice';

export const store = configureStore({
    reducer: {
        deals: dealsReducer,
        user: userReducer,
        customers: customersSlice,
    },

});