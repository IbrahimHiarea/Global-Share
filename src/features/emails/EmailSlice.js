//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as emailAPI from './EmailAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const EmailModel = {
    id: 0,
    subject: '',
    nextRecruitmentStatus: '',
    body: '',
    cc: []
}

const emailAdapter = createEntityAdapter({
    selectId : (em) => em.id,
    sortComparer: (emA , emB) => emA.id - emB.id
});


//thunk actions


//create slice
const emailSlice = createSlice({
    name : 'email',
    initialState: emailAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addEmail: (state , action) => {
            emailAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyEmail: (state , action) => {
            emailAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {
        
    }
})


//selector
export const {
    selectAll: selectAllEmail,
    selectById: selectEmailById,
} = emailAdapter.getSelectors(state => state.email);
export const selectEmailStatus = state => state.email.status;
export const selectEmailError = state => state.email.error;

//actions
export const {addManyEmail, addEmail} = emailSlice.actions;

// reducer
export default emailSlice.reducer;