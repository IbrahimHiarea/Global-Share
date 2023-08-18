//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as hourLogAPI from './hourLogAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const hourLogAdapter = createEntityAdapter({
    selectId: (task) => task.id,
    sortComparer: (taskA , taskB) => new Date(taskA.deadline) - new Date(taskB.deadline)
});

//thunk action 
export const getHourLog = createAsyncThunk(
    'hourLog/getHourLog',
    async (data , thunkAPI) =>{
        try{
            const {auth: {token}} = thunkAPI.getState();
            const response = await hourLogAPI.getHourLog(data, 0 , token , thunkAPI.signal);
            return {search: data , data: response.data};
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
            const { hourLog : {searchTerms , status} } = getState()
            if (status === status.loading || (searchTerms.search===data.search
                && searchTerms.squadId===data.squadId)) {
                return false;
            }
        },
    }
);

export const getHourLogPage = createAsyncThunk(
    'hourLog/getHourLogPage',
    async (data , thunkAPI) => {
        try{    
            const {auth: {token} , hourLog: {searchTerms}} = thunkAPI.getState();
            const response = await hourLogAPI.getHourLog(searchTerms , data.skip , token , thunkAPI.signal);
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

const hourLogSlice = createSlice({
    name: 'hourLog',
    initialState: hourLogAdapter.getInitialState({
        status: status.idle,
        error: null,
        searchTerms: {
            search: undefined,
            squadId: undefined
        },
        totalCount: 0,
        resetTable: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHourLog.pending , (state, _) => {
                state.status = status.loading;
            })
            .addCase(getHourLog.fulfilled , (state, action) => {
                const tasks = [];
                action.payload.data?.forEach((status) => tasks.push(status.tasks))
                hourLogAdapter.setAll(state , tasks.flat());
                state.totalCount = action.payload.count;
                state.searchTerms = action.payload.search;
                state.resetTable = !(state.resetTable);
                state.status = status.succeeded;
            })
            .addCase(getHourLog.rejected , (state, action) => {
                state.error = action.payload;
                state.status = status.failed;
            })
            .addCase(getHourLogPage.pending , (state , _) => {
                state.status = status.loading
            })
            .addCase(getHourLogPage.fulfilled , (state , action) => {
                const tasks = [];
                action.payload.data?.forEach((status) => tasks.push(status.tasks))
                hourLogAdapter.setMany(state , tasks.flat());
                state.totalCount = action.payload.count;
                state.status = status.succeeded;
            })
            .addCase(getHourLogPage.rejected , (state , action) => {
                state.error = action.payload;
                state.status = status.failed;
            })
    }
});


export const {
    selectAll: selectAllHourLog,
    selectTotal: selectHourLogCount
} = hourLogAdapter.getSelectors(state => state.hourLog);
export const selectHourLogStatus = state => state.hourLog.status;
export const selectHourLogError = state => state.hourLog.error;
export const selectHourLogTotalCount = state => state.hourLog.totalCount;
export const selectHourLogResetTable = state => state.hourLog.resetTable;

//actions

//reducer
export default hourLogSlice.reducer;