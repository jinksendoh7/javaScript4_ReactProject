import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import userReducer from './slices/usersSlice';
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer,
    },
});