//import redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//import API
import * as authRequest from "./AuthAPI";

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
    isAuthorized: false,
    token: null,
    info: {},
}

// thunks actions
export const login = createAsyncThunk(
    'auth/login', 
    async (data , thunkAPI) => {
        try{
            const response = await authRequest.loginRequest(data , thunkAPI.signal);
            return response.data;
        } catch(error){
            let message = "Network connection error"
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
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

export const checkToken = createAsyncThunk(
    'auth/checkToken',
    async (_ , thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const response = await authRequest.checkToken(token , thunkAPI.signal);
            return response.data;
        } catch(error){
            localStorage.clear();
            const message = 'unAuthorized';
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () =>{
        localStorage.clear();
        return;
    }
);


//creating auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        tokenAdded: (state , action) => {
            state.token = action.payload;
            state.status = status.succeeded;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending , (state , _) => {
                state.status = status.loading;
            })
            .addCase(login.fulfilled , (state , action) => {
                const {firstName , lastName , role , id} = action.payload.user;
                state.token = action.payload.token;
                state.isAuthorized = true;
                state.info = {
                    id: id,
                    name: firstName + " " + lastName,
                    role: role,
                }
                state.status = status.succeeded;
            })
            .addCase(login.rejected , (state , action) => {
                state.error = action.payload;
                state.isAuthorized = false;
                state.status = status.failed;
            })
            .addCase(checkToken.pending , (state , _) => {
                state.status = status.loading;
            })
            .addCase(checkToken.fulfilled , (state , action) => {
                const {firstName , lastName , role , id} = action.payload;
                state.info = {
                    id: id,
                    name: firstName + " " + lastName,
                    role: role,
                };
                state.isAuthorized = true;
                state.status = status.succeeded;
            })  
            .addCase(checkToken.rejected , (state , _) => {
                state.token = null;
                state.info = null;
                state.isAuthorized = false;
                state.status = status.failed;
            })
            .addCase(logout.fulfilled , (state , _) => {
                state.token = null;
                state.info = null;
                state.isAuthorized = false;
                state.status = status.idle;
            })
    }
});

// selectors
export const selectAllAuth = state => state.auth;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthToken = state => state.auth.token;
export const selectAuthError = state => state.auth.error;
export const selectIsAuthorized = state => state.auth.isAuthorized;
export const selectAuthInfo = state => state.auth.info;


// actions
export const { tokenAdded } = authSlice.actions;

// reducer
export default authSlice.reducer;