import { createSlice } from '@reduxjs/toolkit';
import {fetchAllEmployees,updateUser,addNewUser,deleteUser} from './api'

// Define the initial state for the employees slice
const initialState = {
    employees: [] ,
    isLoading: false,
    status: 'idle',
    error: null,

};

// Create the employees slice
const userSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchAllEmployees action
        builder
            .addCase(fetchAllEmployees.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(fetchAllEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoading = false;
                state.employees = action.payload;
            })
            .addCase(fetchAllEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                //state.error = action.error.message || action.payload || null;
            });

        // Handle addNewUser action
        builder
            .addCase(addNewUser.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoading = false;
                state.employees.push(action.payload); // Add the new user to the employees array
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.error.message || action.payload || null;
            });

        // Handle deleteUser action
        builder
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove the deleted user from the employees array
                state.employees = state.employees.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });

        // Handle updateUser action
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Find the user in the employees array and update their data
                const updatedUserIndex = state.employees.findIndex(user => user.id === action.payload.id);
                if (updatedUserIndex !== -1) {
                    state.employees[updatedUserIndex] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.log(state,"state")
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

// Export the employees reducer
export default userSlice.reducer;
