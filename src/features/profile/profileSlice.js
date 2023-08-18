//import redux
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";

//import API
import * as profileAPI from "./ProfileAPI";

// import utils
import { format } from "date-fns";

//import selectors
import { selectAuthToken } from "../auth/AuthSlice";

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const initialState = {
    status: status.idle,
    error: null,
    data : {
        id: 0,
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        additionalEmail: "",
        middleName: "",
        arabicFullName: "",
        appointlet: "",
        bio: "",
        gsStatus: "",
        joinDate: "2000-1-1",
        tasksCompleted: 0,
        volunteeredHours: 0,
        position: {},
    },
    profileSquads: [],
}

//thunks actions
export const fetchProfileDetails = createAsyncThunk(
    'profile/fetchProfileDetails',
    async ( _ , {rejectWithValue , getState , signal}) => {
        try{
            const token = selectAuthToken(getState());
            const response = await profileAPI.fetchProfileDetails(token , signal);
            return response.data;
        }
        catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return rejectWithValue(message);
        }
    },
    {
        condition: (_, {getState}) => {
            const { profile } = getState()
            const authStatus = profile.status;
            if (authStatus === status.succeeded || authStatus === status.loading) {
                return false
            }
        },
    }
);

export const updateProfileDetails = createAsyncThunk(
    'profile/updateProfileDetails',
    async (data , {rejectWithValue , getState ,  signal}) => {
        try{
            const token = selectAuthToken(getState());
            await profileAPI.updateProfileDetails(data , token , signal);
            return data;
        }
        catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return rejectWithValue(message);
        }
    },  
);

//creating profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileDetails.pending , (state ,action) => {
                state.status = status.loading;
            })
            .addCase(fetchProfileDetails.fulfilled , (state , action) => {
                for(let key of Object.keys(action.payload)){
                    if(action.payload[key]===null)
                        action.payload[key] = "";
                    if(key==='joinDate') 
                        action.payload[key] = format(new Date(action.payload[key]) , 'yyyy-MM-dd');
                }
                action.payload.positions?.forEach(element => {
                    state.profileSquads.push(element.position.squad);
                });
                state.status = status.succeeded;
                state.data = action.payload;
            })
            .addCase(fetchProfileDetails.rejected , (state , action) =>{
                state.status = status.failed;
                state.error = action.payload;
            })
            .addCase(updateProfileDetails.pending , (state , action) => {
                state.status = status.loading;
            })
            .addCase(updateProfileDetails.fulfilled , (state , action) => {  
                state.status = status.succeeded;
                for(let key of Object.keys(action.payload)){
                    state.data[key] = action.payload[key];
                }
            })
            .addCase(updateProfileDetails.rejected , (state , action) => {
                state.status = status.succeeded;
                state.error = action.payload;
            })
    },
});

//selectors
export const selectAllProfile = state => state.profile;
export const selectProfileStatus = state => state.profile.status;
export const selectProfileError = state => state.profile.error;
export const selectProfileData = state => state.profile.data;
export const selectProfileSquads = state => state.profile.profileSquads;

//actions


//reducer
export default profileSlice.reducer;