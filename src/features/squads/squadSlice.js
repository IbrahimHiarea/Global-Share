//import redux
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice 
} from '@reduxjs/toolkit';

//import API
import * as squadAPI from './squadAPI';

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const squadModel = {
    id: 0,
    name: '',
    gsName: '',
    description: '',
    imageUrl: '',
    positions: [
        {
            id: 0,
            name: '',
            gsName: '',
            weeklyHours: 0,
            gsLevel: '',
            squadId: 0,
        }
    ], //position model
}   

const squadAdapter = createEntityAdapter({
    selectId: (sq) => sq.id,
    sortComparer: (sqA , sqB) => sqA.id - sqB.id
});

//thunk actions
export const getSquads = createAsyncThunk(
    'squads/getSquads',
    async (data , thunkAPI) =>{
        try{
            const token = thunkAPI.getState().auth.token;
            const response = await squadAPI.getSquads(data.search , data.skip , data.take , token , thunkAPI.signal);
            return response.data;
        } catch(error){
            
        }
    }, 
);

//create slice
const squadSlice = createSlice({
    name:'squad',
    initialState: squadAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addSquad: (state , action) => {
            squadAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManySquad: (state , action) => {
            squadAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {

    }
});


//selector
export const {
    selectAll: selectAllSquad,
    selectById: selectSquadById,

} = squadAdapter.getSelectors(state => state.squad);
export const selectSquadStatus = state => state.squad.status;
export const selectSquadError = state => state.squad.error;

//action
export const {addManySquad , addSquad} = squadSlice.actions;

//reducer
export default squadSlice.reducer;