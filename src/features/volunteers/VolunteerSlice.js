//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as volunteerAPI from './VolunteerAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const volunteerModel = {
    id: 0,
    email: "",
    password: '',
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
    positionId: "",
    position: {
        name: '',
        squad: {
            name: ''
        }
    },
    comments: [],
}

const volunteerAdapter = createEntityAdapter({
    selectId : (vol) => vol.id,
    sortComparer: (volA , volB) => volA.id - volB.id
});


//thunk actions
export const getVolunteers = createAsyncThunk(
    'volunteer/getVolunteers',
    async (data , thunkAPI) =>{
        try{
            const {auth: {token}} = thunkAPI.getState();
            const response = await volunteerAPI.getVolunteers(data, 0 , token , thunkAPI.signal);
            return {search: data , ...(response.data)};
        } catch(error){
            let message = "Network connection error";
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
            const { volunteer : {searchTerms , status} } = getState()
            if (status === status.loading || (searchTerms.search===data.search
                && searchTerms.status===data.status && searchTerms.level===data.level
                && searchTerms.position===data.position && searchTerms.squad===data.squad)) {
                return false;
            }
        },
    }
);

export const getVolunteerPage = createAsyncThunk(
    'volunteer/getVolunteerPage',
    async (data , thunkAPI) => {
        try{    
            const {auth: {token} , volunteer: {searchTerms}} = thunkAPI.getState();
            const response = await volunteerAPI.getVolunteers(searchTerms , data.skip , token , thunkAPI.signal);
            return response.data;
        }catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return thunkAPI.rejectWithValue(message);
        }
    },  
);

export const createVolunteer = createAsyncThunk(
    `volunteer/createVolunteer`,
    async (data , thunkAPI) => {
        try{    
            const {auth: {token}} = thunkAPI.getState();
            const response = await volunteerAPI.createVolunteer(data , token , thunkAPI.signal);
            return response.data;
        }catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return thunkAPI.rejectWithValue(message);
        }
    }, 
);

export const updateVolunteer = createAsyncThunk(
    'volunteer/updateVolunteer',
    async (data , thunkAPI) => {
        try{
            const {id , ...values} = data;
            const {auth : {token}} = thunkAPI.getState();
            const response = await volunteerAPI.updateVolunteer(id , values , token , thunkAPI.signal);
            return response.data;
        }catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteVolunteer= createAsyncThunk(
    'volunteer/deleteVolunteer',
    async (data , thunkAPI) => {
        try{    
            const {auth : {token}} = thunkAPI.getState();
            await volunteerAPI.deleteVolunteer(data.id , token , thunkAPI.signal);
            return data.id;
        }catch(error){
            let message = "Network connection error";
            if(error?.response?.data?.message){
                if(typeof error.response.data.message === 'string') 
                    message = error.response.data.message;
                else 
                    message = error.response.data.message[0];
            }
            return thunkAPI.rejectWithValue(message);
        }
    }
);


//create slice
const volunteerSlice = createSlice({
    name : 'volunteer',
    initialState: volunteerAdapter.getInitialState({
        status: status.idle,
        error: null,
        searchTerms: {
            search: undefined,
            level: undefined,
            status: undefined,
            position: undefined,
            squad: undefined
        },
        totalCount: 0,
        resetTable: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVolunteers.pending , (state , _) => {
                state.status = status.loading;
            })
            .addCase(getVolunteers.fulfilled, (state , action) => {
                volunteerAdapter.setAll(state , action.payload.data);
                state.totalCount = action.payload.count;
                state.searchTerms = action.payload.search;
                state.resetTable = !(state.resetTable);
                state.status = status.succeeded;
            })
            .addCase(getVolunteers.rejected , (state , action) => {
                state.error = action.payload;
                state.status = status.failed;
            })
            .addCase(getVolunteerPage.pending , (state , _) => {
                state.status = status.loading;
            })
            .addCase(getVolunteerPage.fulfilled , (state , action) => {
                volunteerAdapter.setMany(state , action.payload.data);
                state.totalCount = action.payload.count;
                state.status = status.succeeded
            })
            .addCase(getVolunteerPage.rejected , (state , action) => {
                state.error = action.payload;
                state.status = status.failed;
            })
            .addCase(updateVolunteer.fulfilled , (state , action) => {
                volunteerAdapter.upsertOne(state , action.payload);
            })
            .addCase(deleteVolunteer.fulfilled , (state, action) => {
                volunteerAdapter.removeOne(state, action.payload);
            })
    }
})

//selector
export const {
    selectAll: selectAllVolunteer,
    selectById: selectVolunteerById,
    selectTotal: selectVolunteerCount,
} = volunteerAdapter.getSelectors(state => state.volunteer);
export const selectVolunteerStatus = state => state.volunteer.status;
export const selectVolunteerError = state => state.volunteer.error;
export const selectVolunteerTotalCount = state => state.volunteer.totalCount;
export const selectVolunteerResetTable = state => state.volunteer.resetTable;

//actions

// reducer
export default volunteerSlice.reducer;