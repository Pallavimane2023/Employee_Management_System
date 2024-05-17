import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from'./employeeSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
});

