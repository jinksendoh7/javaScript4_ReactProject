import { configureStore } from '@reduxjs/toolkit';
import dealsReducer from './slices/dealsSlice';
import userReducer from './slices/usersSlice';
export const store = configureStore({
    reducer: {
        deals: dealsReducer,
        user: userReducer,
    },
});