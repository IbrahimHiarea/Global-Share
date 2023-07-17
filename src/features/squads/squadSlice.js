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
    positions: [],
    board: {}
}   

const squadAdapter = createEntityAdapter({
    selectId: (sq) => sq.id,
    sortComparer: (sqA , sqB) => sqA.id - sqB.id
});


//thunk actions


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