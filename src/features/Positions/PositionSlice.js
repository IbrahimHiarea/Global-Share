//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as polunteerAPI from './PositionAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

// const PositionModel = {
//     id: 0,
//     email: "",
//     phoneNumber: "",
//     firstName: "",
//     lastName: "",
//     additionalEmail: "",
//     middleName: "",
//     arabicFullName: "",
//     appointlet: "",
//     bio: "",
//     gsStatus: "",
//     joinDate: "2000-1-1",
//     positionId: "",
//     position: {}
// }

const postionAdapter = createEntityAdapter({
    selectId : (vol) => vol.id,
    sortComparer: (volA , volB) => volA.id - volB.id
});


//thunk actions


//create slice
const positionSlice = createSlice({
    name : 'position',
    initialState: postionAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addPosition: (state , action) => {
            postionAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyPosition: (state , action) => {
            postionAdapter.addMany(state , action.payload);
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
} = postionAdapter.getSelectors(state => state.position);
export const selectPositionStatus = state => state.position.status;
export const selectPositionError = state => state.position.error;

//actions
export const {addManyPosition, addPosition} = positionSlice.actions;

// reducer
export default positionSlice.reducer;