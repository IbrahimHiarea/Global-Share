//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as positionAPI from './PositionAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const PositionModel = {
    id: 0,
    name: '',
    gsName: '',
    jobDescription: '',
    weeklyHours: 0,
    gsLevel: '',
    squadId: 0,
    squad: {}, //squad model
    users: [],
}

const positionAdapter = createEntityAdapter({
    selectId : (po) => po.id,
    sortComparer: (poA , poB) => poA.id - poB.id
});


//thunk actions


//create slice
const positionSlice = createSlice({
    name : 'position',
    initialState: positionAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addPosition: (state , action) => {
            positionAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyPosition: (state , action) => {
            positionAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {
        
    }
})


//selector
export const {
    selectAll: selectAllPosition,
    selectById: selectPositionById,
} = positionAdapter.getSelectors(state => state.position);
export const selectPositionStatus = state => state.position.status;
export const selectPositionError = state => state.position.error;

//actions
export const {addManyPosition, addPosition} = positionSlice.actions;

// reducer
export default positionSlice.reducer;