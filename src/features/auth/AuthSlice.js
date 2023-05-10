//import redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
export const login = createAsyncThunk('auth/login' , async ({username , password}) => {
    await new Promise(resolve => setTimeout(() => resolve() , 5000));
    return 'fsgwg%gfdl';
});


//creating auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        tokenAdded: (state , action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) =>{
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
                state.status = status.failed;
                state.error = action.payload;
            })
    }
});

// selectors
export const selectAllAuth = state => state.auth;
export const selectStatus = state => state.auth.status;
export const selectToken = state => state.auth.token;
export const selectError = state => state.auth.error;

// actions
export const { tokenAdded } = authSlice.actions;

// reducer
export default authSlice.reducer;