
import { createSlice } from '@reduxjs/toolkit';
import {login} from './api'

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
    isAuthenticated: initialUser?.isAuthenticated || false,
    username: initialUser?.user || '',
    role: initialUser?.role || '',
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.role = action.payload.role;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.username = '';
                state.role = '';
                state.error = 'Invalid username or password';
            });
    },
});



 export default authSlice.reducer;
