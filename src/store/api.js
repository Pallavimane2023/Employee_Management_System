import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  base URL for the API
const BASE_URL = 'http://localhost:3005';


// Define an async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        console.log(username)
        try {
            const users = await axios.get('http://localhost:3005/employees', {
                params: { username, password },
            }).then(res=>res.data)

            const user = users.find((u) => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                return {
                    username: user.username,
                    role: user.role,
                    isAuthenticated: user.isAuthenticated
                };
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.log("err",error)
            throw error;
        }
    }
);

//  async thunk for fetching all users
export const fetchAllEmployees = createAsyncThunk('employees/fetchAllEmployees', async () => {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
});

//  async thunk for adding a new user
export const addNewUser = createAsyncThunk(
    'employees/addNewUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/employees`, newUser);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
           
                return rejectWithValue(error.response.data);
            } else {
                throw error;
            }
        }
    }
);

//  async thunk for updating a user
export const updateUser = createAsyncThunk(
    'employees/updateUser',
    async (updatedUser) => {
        console.log(updateUser,"user")
        const response = await axios.put(`${BASE_URL}/employees/${updatedUser.id}`, updatedUser);
        return response.data; // Return the updated user data
    }
);


//  async thunk for deleting a user
export const deleteUser = createAsyncThunk('employees/deleteUser', async (empId) => {
    // Send a DELETE request to the server to delete the user
    const response = await axios.delete(`${BASE_URL}/employees/${empId}`);
    return empId; // Return the deleted user's ID to update the Redux state
});
