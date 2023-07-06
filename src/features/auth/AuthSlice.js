//import redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//import API
import { loginRequest } from "./AuthAPI";

// init state
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const initialState = {
    status: status.idle,
    error: null,
    token: ''
}


// thunks actions
export const login = createAsyncThunk(
    'auth/login', 
    async (data , thunkAPI) => {
        try{
            const response = await loginRequest(data , thunkAPI.signal);
            return response.data.token;
        } catch(error){
            let message = "Network connection error"
            if(error?.response?.data?.message) message = error.response.data.message[0]
            return thunkAPI.rejectWithValue(message);
        }
    }, 
    {
        condition: (data, {getState}) => {
            const { auth } = getState()
            const authStatus = auth.status;
            if (authStatus === status.succeeded || authStatus === status.loading) {
                return false
            }
        },
    }
); 


//creating auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        tokenAdded: (state , action) => {
            state.status = status.succeeded;
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending , (state , action) => {
                state.status = status.loading;
            })
            .addCase(login.fulfilled , (state , action) => {
                console.log(action);
                state.status = status.succeeded;
                state.token = action.payload;
            })
            .addCase(login.rejected , (state , action) => {
                console.log(action);
                state.status = status.failed;
                state.error = action.payload;
            })
    }
});

// selectors
export const selectAllAuth = state => state.auth;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthToken = state => state.auth.token;
export const selectAuthError = state => state.auth.error;

// actions
export const { tokenAdded } = authSlice.actions;

// reducer
export default authSlice.reducer;